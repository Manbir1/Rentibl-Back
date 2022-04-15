const express = require('express')
const db = require('../db');
const router = express.Router()

/*
Endpoint 21:
Description: Send offer to sell
URL: http://localhost:3001/api/sell
Method: POST
Input: 
[{
    "Username”: string,
    “OfferValue”: double,
    “Title”: string,
    “ConsoleName”: string,
    “PublisherName”: string,
    “WarehouseLocation”: String
}]
Output: 
[{
	“ID”:int
}]
*/
router.post('/',(req,res)=>{
	// let newGame = false
	// let newGameID
	db.query('SELECT ID FROM Video_Game AS V WHERE V.Title=? AND V.ConsoleName=? AND V.PublisherName=?',[req.body.Title,req.body.ConsoleName,req.body.PublisherName],(err1,data1)=>{
		if (err1) {
			res.send(400)
			return
		}
		if (data1.length == 0) {
			// newGame = true
			// db.query('INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL) VALUES(?,?,?,?,?,?,?,?)',
			// [null, req.body.Title, null, null, req.body.PublisherName, req.body.ConsoleName, null, null], (err2, data2)=>{
			// 	if (err2) {
			// 		res.send(400)
			// 	}
			// 	db.query('SELECT LAST_INSERT_ID() AS id',(err4,data4)=>{
			// 		newGameID = data4[0].id
			// 	})
			// })
			res.send({ID: null})
			return
		}

		db.query('INSERT INTO Makes_Offers (Username, ID, Location, OfferValue) VALUES(?,?,?,?)',
			[req.body.Username, data1[0].ID, req.body.WarehouseLocation, req.body.OfferValue], (err5, data5)=>{
				if (err5) {
					throw err5
				}
				else {
					res.send({ID: data1[0].ID})
				}
			})

		// if (newGame) {
		// 	db.query('INSERT INTO Makes_Offers (Username, ID, Location, OfferValue) VALUES(?,?,?,?)',
		// 	[req.body.Username, newGameID, req.body.Warehouse, req.body.OfferValue], (err3, data3)=>{
		// 		if (err3) {
		// 			res.send(400)
		// 		}
		// 		else {
		// 			res.send({ID: newGameID})
		// 		}	
		// 	})
		// }
		
		// else {
		// 	db.query('INSERT INTO Makes_Offers (Username, ID, Location, OfferValue) VALUES(?,?,?,?)',
		// 	[req.body.Username, data1[0].ID, req.body.Warehouse, req.body.OfferValue], (err5, data5)=>{
		// 		if (err5) {
		// 			res.send(400)
		// 		}
		// 		else {
		// 			res.send({ID: data1[0].ID})
		// 		}
		// 	})
		// }
	})
})

/*
Endpoint 22:
Description: Get previous offers
URL: http://localhost:3001/api/sell/{Username}
Method: GET
Input: None
Output 
[{
    “Offers” : [{
		“ID” : int
		“OfferValue” : double
		“Status” : string
	}]
}]
*/
router.get('/:Username', (req,res)=>{
	const { Username } = req.params
	db.query('SELECT ID, OfferValue, Status FROM Makes_Offers WHERE Username=?',[Username],(err,data)=>{
		if (err) {
			throw err
			return
		}
		else {
			res.send({Offers: data})
		}
	})
})

/*
Endpoint 23:
Description: Admin view for getting offers from a warehouses they manage
URL: http://localhost:3001/api/sell/admin/{Admin_ID}
Method: GET
Input: None
Output: 
[{
	 “Offer” : [{
		“Username”: String
		“ID” : int
		“OfferValue” : double
		“Status” : string
		"Location": string
	}]
}]
*/
router.get('/admin/:Admin_ID', (req,res)=>{
	db.query('SELECT M.Username, ID, OfferValue, Status, M.Location FROM Admin AS A, Makes_Offers AS M, Manages AS K WHERE A.Admin_ID=? AND A.Admin_ID=K.Admin_ID AND M.Location=K.Location AND Status="Pending"',[req.params.Admin_ID],(err,data)=>{
		if (err) {
			throw err
		}
		else {
			res.send({Offers: data})
		}
	})
})

/*
Endpoint 24: 
Description: Admin accepts/declines offer
URL: http://localhost:3001/api/sell/admin/decision
Method: PUT
Input: [{
   	“Admin_ID”: int,
	“Decision”: boolean,
	“Username”: String
	“ID” : int
}]
Output: 
[{
	“Status”: boolean
}]
*/

router.put('/admin/decision',async(req,res)=>{

	console.log(req.body)
    if (req.body.Decision) {

		const wait1 = new Promise((resolve, reject) => { db.query('SELECT * FROM Has_Stock AS H WHERE Location IN (SELECT Location FROM Makes_Offers AS K WHERE K.Username=? AND K.ID=? AND K.Status=?) AND ID = ?',[req.body.Username,req.body.ID,"Pending",req.body.ID],async(err,data)=>{
				if(err)
					throw err 
				console.log(data)
				if(data.length == 0){

					let location = ''
					const query = new Promise((resolve, reject) => {
						db.query('SELECT Location FROM Makes_Offers AS K WHERE K.Username=? AND K.ID=? AND K.Status=?', [req.body.Username,req.body.ID,"Pending"],(err, data1) => {
							if(err)
								throw err
							location = data1[0].Location
							resolve();
						});
					});

					await query

					db.query('INSERT INTO Has_Stock(Location,ID,Quantity) VALUES(?,?,?)',[location,req.body.ID,1],(err1,data)=>{
						if(err1)
							throw err1 
						else{
							res.send({Status: true})
						}
					})
				}else{
					db.query('UPDATE Has_Stock AS H, (SELECT Location FROM Makes_Offers AS K WHERE K.Username=? AND K.ID=? AND K.Status=?) AS M SET H.Quantity=H.Quantity+1 WHERE H.Location=M.Location AND H.ID=?',[req.body.Username, req.body.ID, "Pending", req.body.ID],(err3,data3)=>{
						if (err3) {
							throw err3
						}
						else {
							res.send({Status: true})
						}
					})
				}
				resolve();
			})
		})

		await wait1

		db.query('UPDATE Makes_Offers SET Makes_Offers.Status="Approved" WHERE Makes_Offers.Username=? AND Makes_Offers.ID=? AND Makes_Offers.Status=?',[req.body.Username, req.body.ID, "Pending"],(err2, data2)=>{
			if (err2) {
				throw err2
			}	
		})
	}

	else {
		db.query('UPDATE Makes_Offers SET Makes_Offers.Status="Declined" WHERE Makes_Offers.Username=? AND Makes_Offers.ID=? AND Makes_Offers.Status=?',[req.body.Username, req.body.ID, "Pending"],(err4, data4)=>{
			if (err4) {
				throw err4
			}
			else {
				res.send({Status: true})
			}
		})
	}
})

module.exports = router
