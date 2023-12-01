const mysql=require("mysql2");
// My SQL connection configuartion

const connection=mysql.createConnection(
    {
        host:'localhost',
        //user: your_mysql_username
        //password: 'your_mysql_password
        user: 'root',
        password:"",
        database:'SOEN287Project'
    }
)
    // Connect to MySQL and Insert Student
connection.connect((err)=>{
    if(err){
        console.error("Error connecting to MySQL:",err);
        return;
    }
    console.log("Connected to MySQL database");
            // Close the MySQL connection
            // connection.end();
        })
    module.exports=connection