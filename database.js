const mysql = require("mysql");

var connect = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"markdownbs"
})


connect.connect(function(err){
    if(err)throw err;
    console.log("Data base Connected!!");
})

module.exports = connect;