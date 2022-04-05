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


router.post('/', (req,res)=>{
	const q = 'INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL) VALUES(?,?,?,?,?,?,?,?)'
	db.query(q,
		[req.body.price,req.body.title,req.body.ESRB,req.body.description,req.body.publisher,req.body.console,req.body.admin_id,req.body.imgUrl],(err,data)=>{
			if(err)
				res.send(400);
			db.query('SELECT LAST_INSERT_ID() AS id',(err,data)=>{
				console.log(data)
				res.send({id: data[0].id})
			})
		})
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
	const { user } = req.params
	db.query('SELECT ID, OfferValue, Status FROM Video_Game WHERE Username=?',[user],(err,data)=>{
		if (err)
			throw err
		res.send(data)
	})
}))

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
