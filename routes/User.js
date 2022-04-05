const express = require('express')
const db = require('../db');
const router = express.Router()

/*Endpoint 18: Logging in (admin and customer)
Description: Get user Username and password
URL: http://localhost:3001/api/user/login
Method: POST
Input: Username, Password
Output [{
	“success” : Boolean,
   	"admin": Boolean,
}]*/

router.post('/user/login',(req,res)=>{

})



/*Endpoint 19: Account Sign-up
Description: Set customer information in database
URL: https://localhost:3001/api/user
Method: POST
Input: [{
    "First Name": string
    "Last Name": string
    "Username": string
    "Email": string
    "Password": string
    "Phone Number": int,
    “cardNumber”:string,
    “cardholderName”: string,
    “cvv”: int,
    “exDate”: Date
}]
*/

router.post('/user',(req,res)=>{
    
})




module.exports = router