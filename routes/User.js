const express = require('express')
const db = require('../db');
const router = express.Router()

/*
Endpoint 27:
Description: Verify login
URL: http://localhost:3001/api/user/login
Method: POST
Input: 
[{
    "Username": String,
    "Password": String
}]
Output: 
[{
	“success” : Boolean,
   	"admin": Int,
}]
*/
router.post('/login',(req,res)=>{
    const user = req.body.Username
    const password = req.body.Password

    console.log(req.body)

    //Try customer login
    db.query("SELECT * FROM CUSTOMER AS C WHERE Username = ?", [user], (err, connection) => {
        if (err) 
            throw (err)

            //Customer username not found
            if (connection.length == 0) {
                console.log("--------> Customer does not exist")
            }
            //Customer username found
            else{
                const actualPass = connection[0].Password
                //correct password
                if (actualPass == password) {
                    console.log("---------> Login Successful")
                    res.send({success: true, admin: null})
                    return;
                }
                //incorrect password 
                else {
                    console.log("---------> Password Incorrect")
                    res.send({success: false, admin: null})
                    return;
                }
            }

        //Try admin login
        db.query("SELECT * FROM ADMIN AS A WHERE Username = ?", [user], (err, connection) => {
            if (err) 
                throw (err)

            //Admin username not found
            if (connection.length == 0) {
                console.log("--------> Customer does not exist")
                //Throw errors if no login info found at all
                console.log("--------> User does not exist")
                res.sendStatus(404)
                return;
            }
            //Admin username found
            else{
                const actualPass = connection[0].Password
                //correct password
                if (actualPass == password) {
                    console.log("---------> Login Successful")
                    res.send({success: true, admin: connection[0].Admin_ID})
                    return;
                }
                //incorrect password 
                else {
                    console.log("---------> Password Incorrect")
                    res.send({success: false, admin: null})
                    return;
                }
            }
        })
    })
})

/*
Endpoint 28: 
Description: Create account sign-up
URL: http://localhost:3001/api/user
Method: POST
Input: 
[{
    "FirstName": string,
    "LastName": string,
    "Username": string,
    "email": string,
    "Password": string,
    "PhoneNumber": string,
    “cardNumber”:string,
    “cardholderName”: string,
    “cvv”: String,
    “exDate”: Date
}]
Output: 
[{
    Username: String
}]
*/
router.post('/',(req,res)=>{
    const user = req.body.Username
    const password = req.body.Password
    const fname = req.body.FirstName
    const lname = req.body.LastName
    const email = req.body.email
    const phone = req.body.PhoneNumber
    const cNum = req.body.cardNumber
    const cName = req.body.cardholderName
    const cvv = req.body.cvv
    const expiry = req.body.exDate

    //search if user already exists AS CUSTOMER
    db.query("SELECT * FROM CUSTOMER AS C WHERE Username = ?", [user], (err, connection) => {
        if (err) {
            throw err
        }

        //insert data into CUSTOMER table if they dont exist
        //Customer username found
        if (connection.length != 0) {
            console.log("--------> Customer already exists")
            res.send(null)
            return
        }
        //Customer username not found
        else{
            //Insert data into appropriate tables
            db.query("INSERT INTO CUSTOMER (Username, FirstName, LastName, Email, Password, PhoneNumber) VALUES(?,?,?,?,?,?)",
            [user, fname, lname, email, password, phone], (err, data) => {
                if (err) {
                    res.send(null)
                    return
                }else{

                    db.query("INSERT INTO BANKING_INFO (CardNumber, CardholderName, ExpiryDate, CVV, Username) VALUES(?,?,?,?,?)",
                    [cNum, cName, expiry.slice(4,10), cvv, user], (err, data) => {
                        if (err) {
                            res.send(null)
                            throw err
                        }
                        else{
                            res.send({Username: user})
                        }
                    }) 
                }
            })
        }   
    })
})

module.exports = router