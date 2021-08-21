const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
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
const userApi = require('./routes/userAPI');
const todoApi = require('./routes/todoAPI');
const emailApi = require('./routes/sendEmailSchemaAPI');
const uploadApi = require('./routes/uploadAPI');
app.use('/api/v1',userApi);
app.use('/api/v1',todoApi);
app.use('/api/v1',emailApi);
app.use('/api/v1',uploadApi);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})