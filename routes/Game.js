const express = require('express')
const db = require('../db');
const router = express.Router()


/*
Endpoint 1:
Description: Get game info.
URL: http://localhost:3001/api/game/{id}
Method: GET
Output [{
“price”: double,
	“title”: String,
	“ESRB”: String,
	“description” : String,
	“publisher”: String
	“console”: String
	“imgURL” : String
}]
*/
router.get('/:id', (req,res)=>{
    const { id } = req.params
    db.query('SELECT * FROM VIDEO_GAME WHERE ID=?',[id],(err,data)=>{
        if(err)
            throw err
        res.send(data[0])
    })
})

/* 
Endpoint 2:
Description: Create game info
URL: http://localhost:3001/api/game
Method: POST
Input:
[{
“price”: double,
	“title”: String,
	“ESRB”: String,
	“description” : String,
	“publisher”: String
	“console”: String
	“admin_id” : int,
	“imgURL” : String
}]
Output: id

*/
router.post('/', (req,res)=>{
	const q = 'INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL) VALUES(?,?,?,?,?,?,?,?)'
	db.query(q,
		[req.body.price,req.body.title,req.body.ESRB,req.body.description,req.body.publisher,req.body.console,req.body.admin_id,req.body.imgURL],(err,data)=>{
			if(err){
				res.send(400);
			}
			db.query('SELECT LAST_INSERT_ID() AS id',(err,data)=>{
				console.log(data)
				res.send({id: data[0].id})
			})
		})
})

/* 
Endpoint 2:
Description: Create game info
URL: http://localhost:3001/api/game
Method: DELETE
Input:
[{
	"adminId",
	"gameId"
}]
Output: success
*/
router.delete('/',(req,res)=>{

	let adminValid = true

	db.query('SELECT Admin_ID FROM Video_Game WHERE ID=?',[req.body.gameId], (err,data)=>{
		if(err)
			throw err 
		if(data.length == 0|| req.body.adminId!=data[0].Admin_ID){
			adminValid = false
		}
	})

	if(adminValid){
		const q = 'UPDATE Video_Game SET Price=?, Title=?, ESRB_Rating=?, Description=?, PublisherName=?, ConsoleName=?, IMG_URL=? WHERE ID=?'
		db.query(q,[req.body.gameId],(err,data)=>{
			if(err || data.affectedRows == 0){
				res.send({success: false})
			}
			else{
				res.send({success: true})
			}
		})
	}else{
		res.send({success: false})
	}
})

/*
Endpoint 3:
Description: Update game info
URL: http://localhost:3001/api/game/{id}
Method: PUT
Input:
[{	“price”: double,
	“title”: String,
	“ESRB”: String,
	“description” : String,
	“publisher”: String,
	“console”: String,
	“genre”: String,
	“A_id” : int,
	“imgURL” : String
}]
Output: id
 */
router.put('/', (req,res)=>{
	let adminValid = true

	db.query('SELECT Admin_ID FROM Video_Game WHERE ID=?',[req.body.gameId], (err,data)=>{
		if(err)
			throw err 
		if(data.length == 0|| req.body.adminId!=data[0].Admin_ID){
			adminValid = false
		}
	})

	if(adminValid){
		db.query('DELETE FROM Video_Game WHERE ID=?',[req.body.gameId],(err,data)=>{
		})
	}else{
		res.send({success: false})
	}
})

/* 
Endpoint 4:
Description: Get rating of video game with specified id:
URL: http://localhost:3001/api/game/{id}/rating
Method: GET
Output: “rating”: int

*/
router.get('/:id/rating', (req,res)=>{
    const { id } = req.params
    db.query("SELECT * FROM VIDEO_GAME AS V, REVIEW AS R WHERE R.ID=V.ID AND V.ID=?",[id],(err,rows)=>{
        if(err)
            throw err 

        let ratingTot = 0
        for(let i = 0;i<rows.length;i++){
            ratingTot+=rows[i].Rating
        }

		if(rows.length > 0)
        	res.send({rating: (ratingTot/rows.length)})
		else
			res.send({rating: 0})
    })
})

/*
Endpoint 5:
Description: User creates review for video game they bought:
URL:  http://localhost:3001/api/game/{id}/review
Method: POST
Input:
[{
	“username” : String,
	“rating”:   Int,
	“title” : String,
	“comment” : String,
}]
Output: {
	“username” : String,
	“rating”:   Int,
	“title” : String,
	“comment” : String,
	“date”: Date,
	ReviewNumber: Int
} if success, null otherwise
*/

router.post('/:id/review', (req,res)=>{
    const { id } = req.params
	db.query('SELECT MAX(ReviewNumber) AS m FROM Review WHERE id=?',[id],(err,rows)=>{
		let max = rows[0].m
		if(max == null){
			max = 1
		}else{
			max+=1
		}

		db.query('INSERT INTO Review(ReviewNumber,Username,ID,Rating,Comment,Title,DateWritten) VALUES(?,?,?,?,?,?,CURDATE())',
		[max,req.body.username,id,req.body.rating,req.body.comment,req.body.title],(err,rows)=>{
			if(err)
				throw err;
			else{
				res.send({Username: req.body.username, Rating: req.body.rating, Title: req.body.title, Comment:req.body.comment, ReviewNumber: max})
			}
		})
	})
})


/* 
Endpoint 6:
Description: User deletes review for video game they bought:
URL:  http://localhost:3001/api/game/{id}/review
Method: DELETE
Input:
[{
	“username” : String,
	"ReviewNumber": Int
}]
Output: “success”: boolean
*/
router.delete('/:id/review',(req,res)=>{
    const { id } = req.params
	db.query('DELETE FROM Review WHERE ID=? AND Username=? AND ReviewNumber=?',[id,req.body.username,req.body.ReviewNumber],(err,data)=>{

		if(err || data.affectedRows == 0){
			console.log(err)
			res.send({success: false})
		}
		else{
			res.send({success: true})
		}
	})
})


/*

Endpoint 7:
Description: Get all reviews for game
URL: http://localhost:3001/api/game/{id}/review
Method: GET
Input: None
Output:
[{
	“reviewArr”: [{
	“username” : String,
	“rating”:   Int,
	“title” : String,
	“comment” : String,
	“date”: Date
}]
}]
 */
router.get('/:id/review', (req,res)=>{
    const { id } = req.params
    db.query('SELECT R.Username, R.Rating, R.Title, R.Comment, R.DateWritten, R.ReviewNumber FROM REVIEW AS R WHERE R.ID = ?',[id], (err,rows)=>{
        if(err)
            throw err
        res.send(rows)
    })
})

/* 
Endpoint 22:
Description: Get all game consoles currently stored int the database
URL: https://localhost:3001/api/game/consoles
Method: GET
Output:  [{
	“consoles” : [string]
}]

*/

router.get('/info/consoles',(req,res)=>{
	db.query('SELECT Name FROM Console',(err,rows)=>{
		if(err)
			res.send([])
		res.send(rows)
	})
})

/* 
Endpoint 23:
Description: Get all game publishers currently stored int the database
URL: https://localhost:3001/api/game/publishers
Method: GET
Output:  [{
	“publishers” : [string]
}]

*/

router.get('/info/publishers',(req,res)=>{
	db.query('SELECT Name FROM Publisher',(err,rows)=>{
		if(err)
			res.send([])
		res.send(rows)
	})
})

/* 
Endpoint 24:
Description: Get all game locations currently stored int the database
URL: https://localhost:3001/api/game/locations
Method: GET
Output:  [{
	“locations” : [string]
}]
*/

router.get('/info/locations',(req,res)=>{
	db.query('SELECT DISTINCT Location FROM Publisher',(err,rows)=>{
		if(err)
			res.send([])
		res.send(rows)
	})
})

module.exports = router
