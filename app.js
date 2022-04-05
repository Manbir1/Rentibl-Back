const { response } = require('express');
const express = require('express')
const mysql = require('mysql')
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "rentibl"
})

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySql Connected")
})

app.get('/api/game/:id', (req,res)=>{
    const { id } = req.params
    db.query('SELECT * FROM VIDEO_GAME WHERE ID=?',[id],(err,data)=>{
        res.send(data)
    })
})

app.post('/api/game', (req,res)=>{

})

app.put('/api/game', (req,res)=>{

})

app.get('/api/game/:id/rating', (req,res)=>{
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

app.post('/api/game/:id/review', (req,res)=>{
    const { id } = req.params
})

app.get('api/game/:id/review', (req,res)=>{
    const { id } = req.params
    db.query('SELECT R.username, R.rating, R.title, R.comment, R.date FROM REVIEW AS R WHERE R.ID = ?',[id], (err,rows)=>{
        if(err)
            throw err
        res.send(rows)
    })
})



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});