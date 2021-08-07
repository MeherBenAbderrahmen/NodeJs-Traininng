const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

//morgan config
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//get all user
//get one use by id
// add one user
//update user by id
// delete user by id
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})