const express = require('express')
const db = require('../db');
const router = express.Router()

/*
Endpoint 8:
Description: Add item to cart for user
URL: http://localhost:3001/api/cart
Method: POST
Input [{
	“Game_ID”: Int,
	“Username”: String,
	“StartDate”: Date,
	"DueDate”: Date,
	"Location": String
}]
Output: “Success”: boolean

*/

router.post('/',(req,res)=>{
	db.query('INSERT INTO Contains (Username, ID, StartDate, DueDate, Location) VALUES(?,?,?,?,?)',
	[req.body.Username, req.body.Game_ID, req.body.StartDate.slice(0, 10), req.body.DueDate.slice(0, 10), req.body.Location],(err,data)=>{
		if (err) {
			res.send(400)
		} else {
			res.send({Success: true})
		}
	})
})


/* 
Endpoint 9:
Description: Delete item from cart for user
URL: http://localhost:3001/api/cart
Method: DELETE
Input [{
	“Game_ID”: Int,
	“Username”: String,
	"Location": String
}]
Output: “Success”: boolean
*/

router.delete('/',(req,res)=>{
	db.query('DELETE FROM Contains AS C WHERE C.Username=? AND C.ID=? AND C.Location=?',[req.body.Username, req.body.Game_ID, req.body.Location],(err,data)=>{
		if (err) {
			res.send(400)
		} else {
			res.send({Success: true})
		}
	})
})

/*
Endpoint 10:
Description: Get all items from a shopping cart
URL: http://localhost:3001/api/cart
Method: GET
Input: [{
	“Username”: String
}]
Output: [{
	“cartArr”:[{
		“ID”: Int (This is game_id)
		“StartDate”: Date,
		“DueDate”: Date,
		"Location": String
}]
}]
 */

router.get('/',(req,res)=>{
	db.query('SELECT ID, StartDate, DueDate, Location FROM Contains AS C WHERE C.Username=?',[req.body.Username],(err,data)=>{
		if (err) {
			res.send(400)
		} else {
			res.send(data)
		}
	})
})

/*
Endpoint 20: Checkout
Description: User purchases item and purchase is stored in database
URL: https://localhost:3001/api/cart/checkout
Method: POST
Input: [{
	“Username”: String
}]
Output: “Status”: boolean

*/

router.post('/checkout',(req,res)=>{
	db.query('SELECT * FROM Contains AS C WHERE C.Username=?',[req.body.Username],(err,data)=>{
		if (err) {
			res.send(400)
			console.log("ERR1")
			return
		} 
		else 
		{
			// console.log(data)
			for (let i = 0; i < data.length; i++) {
				const d = new Date()
				d.setDate(d.getDate() + (Math.floor(Math.random() * 4) + 2))
				// let temp = d.toString().slice(0, 10)
				db.query('INSERT INTO Rents (Username, ID, DeliveryDate, StartDate, DueDate) VALUES(?,?,?,?,?)',
				[req.body.Username, data[i].ID, d, data[i].StartDate, data[i].DueDate],(err2,data2)=>{
					if (err2) {
						res.send(400)
						console.log("ERR2")
						return
					}	
				})
			}
		}
	})

	db.query('UPDATE Has_Stock AS H, (SELECT ID, Location FROM Contains AS C WHERE C.Username=?) AS D SET H.Quantity=H.Quantity-1 WHERE H.Location=D.Location AND H.ID=D.ID',[req.body.Username],(err3,data3)=>{
		if (err3) {
			throw err3
			console.log("ERR3")
			return
		}
	})
	db.query('DELETE FROM Contains AS C WHERE C.Username=?',[req.body.Username],(err4,data4)=>{
		if (err4) {
			res.send(400)
			console.log("ERR4")
			return
		} else {
			res.send({Status: true})
		}
	})
})	

module.exports = router