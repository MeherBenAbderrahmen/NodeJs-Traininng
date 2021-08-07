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
app.get('/users',(req, res) => {
  res.json({message:'user'});
})
//get one use by id
app.get('/user/:id', (req, res) => {
  res.json({message:'get one user by id'});
})
// add one user
app.post('/users', (req, res) => {
  res.json({message:'user add'});
})
//update user by id
app.put('/user/:id', (req, res) => {
  res.json({message:'user updated'});
})
// delete user by id
app.delete('/user/:id', (req, res) => {
  res.json({message:'user removed'});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})