const express = require('express')
const db = require('../db');
const router = express.Router()

router.get('/:id', (req,res)=>{
    const { id } = req.params
    db.query('SELECT * FROM VIDEO_GAME WHERE ID=?',[id],(err,data)=>{
        if(err)
            throw err
        console.log('hello')
        res.send(data)
    })
})

router.post('/', (req,res)=>{

})

router.put('/', (req,res)=>{

})

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

router.post('/:id/review', (req,res)=>{
    const { id } = req.params
})

router.get('/:id/review', (req,res)=>{
    const { id } = req.params
    db.query('SELECT R.username, R.rating, R.title, R.comment, R.date FROM REVIEW AS R WHERE R.ID = ?',[id], (err,rows)=>{
        if(err)
            throw err
        res.send(rows)
    })
})

module.exports = router
