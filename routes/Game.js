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
        console.log('hello')
        res.send(data)
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
	“genre”: String
“imgURL” : String
}]
Output: id

*/
router.post('/', (req,res)=>{

})

/*
Endpoint 3:
Description: Update game info
URL: http://localhost:3001/api/game/{id}
Method: PUT
Input:
[{
“price”: double,
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
            ratingTot+=rows[i].rating
        }

        res.send({rating: (ratingTot/data.length)})
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
	“date”: Date
}]
Output: “review_numb”: int

*/
router.post('/:id/review', (req,res)=>{
    const { id } = req.params
})


/* 
Endpoint 6:
Description: User deletes review for video game they bought:
URL:  http://localhost:3001/api/game/{id}/review
Method: DELETE
Input:
[{
	“username” : String,
	“Review_numb”: Int
}]
Output: “success”: boolean
*/
router.delete('game/:id/review',(req,res)=>{
    
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
    db.query('SELECT R.username, R.rating, R.title, R.comment, R.date FROM REVIEW AS R WHERE R.ID = ?',[id], (err,rows)=>{
        if(err)
            throw err
        res.send(rows)
    })
})

module.exports = router
