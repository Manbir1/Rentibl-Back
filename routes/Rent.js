const express = require('express')
const db = require('../db');
const router = express.Router()

/*Endpoint 13:
Description: Get all game id’s
URL: http://localhost:3001/api/rent
Method: GET
Output: [{
	“gIds” : [ints]
}]*/

router.get('/',(req,res)=>{
	db.query('SELECT ID FROM VIDEO_GAME',(err,rows)=>{
		if(err)
			throw err
		res.status(200).send(rows)
	})
})


/*Endpoint 14:
Description: Get filtered games
URL: http://localhost:3001/api/rent/filter
Method: GET
Input: [{
	“consoles”: [string] (array of consoles),
	“genres”: [string] (array of genres),
	“publishers”: [string](array of publishers),
	“prices”: [double,double] (an array of two doubles specifying the range),
	“esrb_ratings”: [string],
	“rating”: int, 
	“locations”: [string]
}]
Output: [{
	“gIds” : [ints]
}]*/

router.get('/filter',(req,res)=>{
	
})

module.exports = router