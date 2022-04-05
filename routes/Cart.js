const express = require('express')
const db = require('../db');
const router = express.Router()

/*
Endpoint 8:
Description: Add item to cart for user
URL: http://localhost:3001/api/cart
Method: POST
Input [{
	“g_id”: Int
	“username”: String
	“startDate”: Date,
	“endDate”: Date,
}]
Output: “success”: boolean

*/

router.post('/',(req,res)=>{

})

/* 
Endpoint 9:
Description: Delete item from cart for user
URL: http://localhost:3001/api/cart
Method: DELETE
Input [{
	“g_id”: Int
	“username”: String
}]
Output: “success”: boolean
*/

router.delete('/',(req,res)=>{

})

/*
Endpoint 10:
Description: Get all items from a shopping cart
URL: http://localhost:3001/api/cart
Method: GET
Input: [{
	“username”: String
}]
Output: [{
	“cartArr”:[{
		“g_id”: Int
		“startDate”: Date,
		“endDate”: Date
}]
}]
 */

router.get('/',(req,res)=>{

})

/*
Endpoint 20: Checkout
Description: User purchases item and purchase is stored in database
URL: https://localhost:3001/api/cart/purchase
Method: POST
Input: [{
	“username”: String
}]
Output: “status”: boolean

*/

router.post('/',(req,res)=>{

})

module.exports = router