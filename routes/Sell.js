const express = require('express')
const db = require('../db');
const router = express.Router()

/*
Endpoint 15: Making offers (Submitting current offer)
Description: Send offer to sell
URL: http://localhost:3001/api/sell
Method: POST
Input: [{
    "Username”: string,
    “Offer Value”: double,
    “Title”: string,
    “Console Name”: string,
    “Location”: string,
    “Publisher Name”: string,
    “Warehouse”: String
}]
Output: “id”:int
*/

router.post('/',(req,res)=>{

})

/*
Endpoint 16: Making offers (Displaying previous offers they’ve made)
Description: Get previous offers
URL: https://localhost:3001/api/sell/{user}
Method: GET
Input: [{
    "Username”: string
}]
Output [{
    “offers” : [{
		“g_id” : int
		“offer_val” : double
		“status” : string
}]
}]
*/

router.get(('/:user', (req,res)=>{
	const { username } = req.params
	db.query()
}))

router.get('/:id', (req,res)=>{
    const { id } = req.params
    db.query('SELECT * FROM VIDEO_GAME WHERE ID=?',[id],(err,data)=>{
        if(err)
            throw err
        console.log('hello')
        res.send(data)
    })
})

/*
Endpoint 17: Get Offers
Description: Admin view for getting offers from a warehouses they manage
URL: https://localhost:3001/api/sell/{user}
Method: GET
Input: [{
    “Admin_id”: int
}]
Output: [{
	 “offers” : [{
		“username”: String
		“g_id” : int
		“offer_val” : double
		“status” : string
}]
}]
*/

/*Endpoint 21: 
Description: Admin accepts/declines offer
URL: https://localhost:3001/api/sell/{user}/decision
Method: POST
Input: [{
   	“Admin_id”: int,
	“decision”: boolean,
	“username”: String
	“g_id” : int
}]
Output: “status”:boolean
*/

router.post('/:user/decision',(req,res)=>{
    
})

module.exports = router
