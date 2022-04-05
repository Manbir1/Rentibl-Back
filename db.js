const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "rentibldb"
})

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySql Connected")
})

module.exports = db