const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path=require('path');
const app = express();
const port = 5000;
const db = require('./public/javaScript/SOEN287ProjectDB');


// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(session({
    secret: 'GWIEIS$@322DD452SD332',
    resave: false,
    saveUninitialized: true
  }));
app.listen(port, () => {
  console.log("Listening at port: " + port);
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.post('/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const query=`SELECT * FROM users WHERE email = '${email}'`;
    db.query(query,(error,result)=>{
        if(Object.keys(result).length<=0){
        console.error("There is no account with this email.");
        res.json({userType:"X"});
        }
       else{
        const query2=`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
        db.query(query2,(error,result)=>{
            if(result.length<=0){
            console.error("Wrong password");
            res.json({userType:"W"});
            }
            else{
                // console.log(result[0].id);
                 req.session.user=result[0].id;
                 console.log(req.session.user);
                res.json({userType:result[0].userType,user:result[0]});
            }
        })
       }
    })
    
   
})
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Session destroyed!' });
      }
    });
  });
  
app.post('/register', (req, res) => {
    
    // Access form data using req.body
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const userType = req.body.userType;

    // Send a response
    const StudentData={ 
        userType,firstName,lastName,email,password
    }
    console.log(StudentData);
    const selectQuery=`SELECT * FROM users WHERE email = '${email}'`;
    ;
    db.query(selectQuery,(error,result)=>{
        if(error){
            console.log("Error selecting :",error);
        }
        else{
            if(Object.keys(result).length>0){
            console.log("This user already exists.")
            res.json({status:"exists"});
            }
        else{
    // SOL Query to Insert Student
    const insertQuery='INSERT INTO users set ?';
        // Insert Student
        db.query(insertQuery,StudentData,(error,result)=>{
            if(error){
                console.log("Error inserting student:",error);
            }
            else{
                console.log("Student inserted successfully",result);
                res.json({status:"success"})
            }
        })

        }
        }
    })

  });
app.get('/providerTable',(req,res)=>{
    // console.log("Welcome");
    const id=req.session.user|req.query.id;
    // const id=req.session.user;
    //  console.log(id);
    let selectQuery=`SELECT * FROM provider WHERE id = '${id}'`;
    db.query(selectQuery,(error,response)=>{
        if(error)console.log(error);
        else{
            // console.log(response[0]);
            res.json({response:response[0]});
      
        }
    })
})
app.post('/providerAccountInformation',(req,res)=>{
    console.log("updating account..");
    const id=req.body.id;
    const accountForm=req.body.accountForm;
    const email=req.body.email;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const address=req.body.address;
    const postcode=req.body.postcode;
    const city=req.body.city;
    const country=req.body.country;
    const company=req.body.company;
    const website=req.body.website;
    const user={
        id,address,postcode,city,country,company,website
    }
    let selectQuery=`SELECT * FROM provider WHERE id = '${id}'`;
    db.query(selectQuery,(error,response)=>{
        if(response.length>0){
            let updateQuery = `
            UPDATE provider
            SET 
                address='${address}',
                postcode='${postcode}',
                city='${city}',
                country='${country}',
                company='${company}',
                website='${website}'
            WHERE id='${id}';
        `;
        
            db.query(updateQuery,(error,response)=>{
                if(error)console.log(error);

            })
        }
        else {
            let additionQuery='INSERT INTO provider set ?';
            db.query(additionQuery,user,(error,result)=>{
                if(error){
                    console.log("Error adding provider data:",error);
                }
                else{
                    console.log("provider data inserted successfully",result);
                }
            })
        }
       
    })
})

app.post('/addCustomer', (req, res) => {
    const id = req.session.user || req.body.id;
    console.log(id);
    const name = req.body.name;
    const email = req.body.email;
    const serialNumber = req.body.serialNumber;
    const status = 'Active';
    const subscription = 'Active';
    const info = 'No info';
    const query=`SELECT * FROM customers WHERE email = '${email}' And name = '${name}'`;
        db.query(query,(error,result)=>{
            if(result.length>0){
    
            res.json({message:"X"});
            }
            else{
                const query=`SELECT * FROM customers WHERE serial_numbers = '${serialNumber}'`;
                db.query(query,(error,result)=>{
                    if(result.length>0){
                
                    res.json({message:"R"});
                    }
                    else{
                db.query(
                    'INSERT INTO customers (id, name, email, status, creation_date, subscription, info, serial_numbers) VALUES (?, ?, ?, ?, CURRENT_DATE, ?, ?, ?)',
                    [id, name, email, status, subscription, info, serialNumber],
                    (error, result) => {
                      if (error) {
                        console.error('Error adding customer:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                        res.json({message:"X"});
                      } else {
                        console.log('New customer added:', result);
                        res.json({ message: 'Customer added successfully' });
                      }
                    }
                  );
               
                }
            });
            }
        
  });

});

app.get('/customers', async (req, res) => {
    try {
      const customerId = req.session.user || req.query.id;
      console.log(customerId);
      const selectQuery = 'SELECT * FROM customers WHERE id = ?';
  
      db.query(selectQuery, [customerId], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          if (results.length > 0) {
            res.json({ data: results });
          } else {
            res.status(404).json({ error: 'Customer not found' });
          }
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/deleteCustomer',(req,res)=>{
    let email=req.query.email;
    let deleteQuery=`DELETE FROM customers WHERE email = '${email}'`;
    db.query(deleteQuery,(error,result)=>{
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          } 
          else{
            console.log("Successfully deleted.");
          }
         
    })
  })