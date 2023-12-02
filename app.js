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
               
                res.json({userType:result[0].userType,user:result[0]});
            }
        })
       }
    })
    
   
})
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
    const selectQuery=`SELECT * FROM users WHERE firstname = '${firstName}' AND lastname = '${lastName}' AND email = '${email}'`;
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
    console.log("Welcome");
    const id=req.query.id;

    let selectQuery=`SELECT * FROM provider WHERE id = '${id}'`;
    db.query(selectQuery,(error,response)=>{
        if(error)console.log(error);
        else{
            console.log(response[0]);
            res.json({response:response[0]});
      
        }
    })
})
app.post('/providerAccountInformation',(req,res)=>{
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