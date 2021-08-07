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

//get all user
app.get('/users',async(req, res) => {
  //find all users
  const users = await User.find({});
   res.json(users);
})
//get one use by id
app.get('/user/:id', async(req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user);
})
// add one user
app.post('/users', async(req, res) => {
  console.log(req.body);
  const createdUser = await User.create(req.body)
  res.json({message:'user add'});
})
//update user by id
app.put('/user/:id', async(req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body)
  res.json(updatedUser);
})
// delete user by id
app.delete('/user/:id', async(req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id)
  res.json({message:'user deleted successfuly'});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})