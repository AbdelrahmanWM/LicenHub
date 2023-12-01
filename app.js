const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');
const app = express();
const port = 5000;
const db = require('./public/javaScript/SOEN287ProjectDB');


// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));


app.listen(port, () => {
  console.log("Listening at port: " + port);
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
// res.sendFile(__dirname+'/public/Login&Register/Register.html');

})
app.get('/home',(req,res)=>{
   
})
// app.get('/css/main.css', (req, res) => {
//     res.sendFile(__dirname + '/css/main.css');
//   });
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

    
    // Handle registration logic here
    // For demonstration purposes, just send a response with the form data
    // const responseMessage = `Registration successful!\n
    //   User Type: ${userType}\n
    //   First Name: ${firstName}\n
    //   Last Name: ${lastName}\n
    //   Email: ${email}\n
    //   Password: ${password}`;
  
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
    //    res.redirect('Provider-dashboard/provider_dashboard.html');
    // res.json({ message: responseMessage });
        }
        }
    })
// res.end();

  });
// Now you can use the 'db' object for your database operations
// For example:
// db.query('SELECT * FROM your_table', (err, results) => {
//   if (err) {
//     console.error("Error executing query:", err);
//     return;
//   }
//   console.log("Query results:", results);
// });

/**
 * Here we handle the light/dark mode
 */


