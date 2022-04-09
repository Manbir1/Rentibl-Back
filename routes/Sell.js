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
	// let newGame = false
	// let newGameID
	db.query('SELECT ID FROM Video_Game AS V WHERE V.Title=? AND V.ConsoleName=? AND V.PublisherName=?',[req.body.Title,req.body.ConsoleName,req.body.PublisherName],(err1,data1)=>{
		if (err1) {
			res.send(400)
		}
		if (data1.length == 0) {
			newGame = true
			db.query('INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL) VALUES(?,?,?,?,?,?,?,?)',
			[null, req.body.Title, null, null, req.body.PublisherName, req.body.ConsoleName, null, null], (err2, data2)=>{
				if (err2) {
					res.send(400)
				}
				db.query('SELECT LAST_INSERT_ID() AS id',(err4,data4)=>{
					newGameID = data4[0].id
				})
			})
		}

		if (newGame) {
			db.query('INSERT INTO Makes_Offers (Username, ID, Location, OfferValue) VALUES(?,?,?,?)',
			[req.body.Username, newGameID, req.body.Warehouse, req.body.OfferValue], (err3, data3)=>{
				if (err3) {
					res.send(400)
				}
				else {
					res.send({ID: newGameID})
				}	
			})
		}
		
		else {
			db.query('INSERT INTO Makes_Offers (Username, ID, Location, OfferValue) VALUES(?,?,?,?)',
			[req.body.Username, data1[0].ID, req.body.Warehouse, req.body.OfferValue], (err5, data5)=>{
				if (err5) {
					res.send(400)
				}
				else {
					res.send({ID: data1[0].ID})
				}
			})
		}
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
		if (err) {
			res.send(400)
		}
		else {
			res.send(data)
		}
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
		"location": string
}]
}]
*/

router.get(('/:user', (req,res)=>{
	db.query('SELECT * FROM Admin AS A, Makes_Offers AS M, Manages AS K WHERE Admin.Admin_ID=? AND A.Admin_ID=K.Admin_ID AND M.Location=K.Location',[req.body.Admin_ID],(err,data)=>{
		if (err) {
			res.send(400)
		}
		else {
			res.send(data)
		}
	})
}))

/*Endpoint 21: 
Description: Admin accepts/declines offer
URL: https://localhost:3001/api/sell/{user}/decision
Method: PUT
Input: [{
   	“Admin_id”: int,
	“decision”: boolean,
	“username”: String
	“g_id” : int
}]
Output: “status”:boolean
*/

router.post('/:user/decision',(req,res)=>{
	let offerLocation
    if (req.body.decision) {
		db.query('SELECT Location FROM Makes_Offers AS M WHERE M.Username=? AND M.ID=? AND M.Status=?',[req.params.Username, req.body.g_id, "Pending"],(err,data)=>{
			if (err) {
				res.send(400)
			}
			else {
				offerLocation = data[0].Location
			}	
		})
		db.query('UPDATE Makes_Offers SET Makes_Offers.Status="Approved" WHERE Makes_Offers.Username=? AND Makes_Offers.ID=? AND Makes_Offers.Status=?',[req.params.Username, req.body.g_id, "Pending"],(err2, data2)=>{
			if (err2) {
				res.send(400)
			}	
		})

		db.query('UPDATE Has_Stock SET Has_Stock.Quantity=Has_Stock.Quantity+1 WHERE Has_Stock.Location=?',[offerLocation],(err3,data3)=>{
			if (err3) {
				res.send(400)
			}
			else {
				res.send({status: true})
			}
		})
	}

	else {
		db.query('UPDATE Makes_Offers SET Makes_Offers.Status="Declined" WHERE Makes_Offers.Username=? AND Makes_Offers.ID=? AND Makes_Offers.Status=?',[req.params.Username, req.body.g_id, "Pending"],(err4, data4)=>{
			if (err4) {
				res.send(400)
			}
			else {
				res.send({status: false})
			}
		})
	}
})

module.exports = router
