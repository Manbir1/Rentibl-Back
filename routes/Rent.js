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
Method: POST
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
	ID : [ints]
}]*/

router.post('/filter',(req,res)=>{
	db.query('SELECT * FROM VIDEO_GAME AS V, Publisher AS P WHERE V.PublisherName = P.Name',(err,data)=>{
		if(err)
			throw err

		if(req.body.consoles.length>0){
			data = data.filter((e)=>req.body.consoles.includes(e.ConsoleName))
		}
		if(req.body.publishers.length>0)
			data = data.filter((e)=>req.body.publishers.includes(e.PublisherName))
		if(req.body.prices.length>0)
			data = data.filter((e)=>(e.Price>=req.body.prices[0] && e.Price<=req.body.prices[1]))
		if(req.body.esrb_ratings.length>0)
			data = data.filter((e)=>req.body.esrb_ratings.includes(e.ESRB_Rating))
		//data = data.filter((e)=>e.Rating>=req.body.rating)
		if(req.body.locations.length>0)
			data = data.filter((e) => req.body.locations.includes(e.Location))

		res.send(data.map((e)=>(e.ID)))
	})
})

/*Endpoint 25:
Description: Get games user rents
URL: http://localhost:3001/api/rent/:user/games
Method: GET
Output: [{
	ID : [ints]
}]*/

router.get('/:user/games',(req,res)=>{
	const { user } = req.params
	db.query('SELECT * FROM Rents WHERE Username=?',[user],(err,rows)=>{
		if(err)
			throw err
		res.send(rows)
	})
})



module.exports = router