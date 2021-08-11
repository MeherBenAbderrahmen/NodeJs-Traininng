const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
//data base connection
require('./database/connect')

const User = require('./models/userSchema')

//morgan config
app.use(morgan('dev'))
//config body parse
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//require routes
const userApi = require('./routes/userAPI')
app.use('',userApi);
const todoApi = require('./routes/todoAPI')
app.use('',todoApi)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})