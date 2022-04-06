const express = require('express')
const db = require('../db');
const router = express.Router()

/*
Endpoint 11:
Description: Updating the stock of a game item
URL: http://localhost:3001/api/stock
Method: PUT
Input: [{
“g_id”: Int,
	“A_id”: int,
	“newStock”: Int,
	“warehouseLocation”: String }]
*/

// router.put('/',(req,res)=>{
// 	const gameID = req.body.g_id
// 	const adminID = req.body.A_id
// 	const newStock = req.body.newStock
// 	const wareH = req.body.warehouseLocation

// 	db.query('UPDATE Has_Stock SET Has_Stock.Quantity=Has_Stock.Quantity+1 WHERE Has_Stock.Location=?',[wareH],(err,data)=>{
// 		if (err)
// 			res.send(400)
// 	})


// 	// db.query('UPDATE Has_Stock SET Has_Stock.Quantity=Has_Stock.Quantity+1 WHERE Has_Stock.Location=?',[offerLocation],(err2,data2)=>{
// 	// 	if (err)
// 	// 		res.send(400)



// })

/*
Endpoint 12:
Description: Verify if game has stock available in any warehouses
URL: http://localhost:3001/api/stock
Method: GET
Input: [{
	“g_id”: Int,
}]
Output: “inStock” : Boolean
 */

router.get('/',(req,res)=>{
	const id = req.g_id
	db.query('SELECT * FROM VIDEO_GAME AS V, HAS_STOCK AS H WHERE H.QUANTITY > 0 V.ID = H.ID AND V.ID = ?',[id],(err,data)=>{
        if(err)
            throw err
		
		if (data.length == 0){
			console.log('No games in stock')
			res.send({inStock: false})
		}	
        else{
			console.log('Games in stock')
			res.send({inStock: true})
		}
    })
    
})

module.exports = router