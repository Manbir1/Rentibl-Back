const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 3001;

const gameRoute = require('./routes/Game')

app.use('/api/game',gameRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});