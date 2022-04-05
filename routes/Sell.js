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
	let newGame = false
	let newGameID
	db.query('SELECT ID FROM Video_Game AS V WHERE V.Title=? AND V.ConsoleName=? AND V.PublisherName=?',[req.body.Title,req.body.ConsoleName,req.body.PublisherName],(err1,data1)=>{
		if (err1)
			res.send(400)
		if (data1.length == 0) {
			newGame = true
			db.query('INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL) VALUES(?,?,?,?,?,?,?,?)',
			[null, req.body.Title, null, null, req.body.PublisherName, req.body.ConsoleName, null, null], (err2, data2)=>{
				if (err2)
					res.send(400)
				db.query('SELECT LAST_INSERT_ID() AS id',(err4,data4)=>{
					newGameID = data4[0].id
				})
			})
		}
		
		db.query('INSERT INTO Makes_Offers (Username, ID, Location, OfferValue) VALUES(?,?,?,?)',
		[req.body.Username, data1[0].ID, req.body.Warehouse, req.body.OfferValue], (err3, data3)=>{
			if (err3)
				res.send(400)
			if (newGame)
				res.send({ID: newGameID})
			else
				res.send({ID: data1[0].ID})
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
			res.send(400)
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
