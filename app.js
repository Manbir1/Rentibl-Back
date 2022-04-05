const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 3001;

const gameRoute = require('./routes/Game')
const cartRoute = require('./routes/Cart')
const rentRoute = require('./routes/Rent')
const sellRoute = require('./routes/Sell')
const stockRoute = require('./routes/Stock')
const userRoute = require('./routes/User')

app.use(express.json())

app.use('/api/game',gameRoute)
app.use('/api/cart',cartRoute)
app.use('/api/rent',rentRoute)
app.use('/api/sell',sellRoute)
app.use('/api/stock',stockRoute)
app.use('/api/user',userRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});