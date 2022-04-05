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

router.put('/',(req,res)=>{

})

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
    
})

module.exports = router