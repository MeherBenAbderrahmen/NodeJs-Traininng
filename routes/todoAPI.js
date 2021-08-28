const express = require('express');
const router = express.Router();
const ToDo = require('../models/todoSchema')
const passport = require('passport')
const User = require('../models/userSchema');

//get all todo
router.get('/todos',passport.authenticate('bearer', { session: false }), async (req, res) => {
    //find all users
    try {
      const allTodo = await ToDo.find({});
      res.json(allTodo);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  //get one todo by id
  router.get('/todos/:id', async (req, res) => {
    try {
      const todoId = await ToDo.findById(req.params.id)
      res.json(todoId);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  // add one todo
  router.post('/todos', async (req, res) => {
    try {
      console.log(req.body);
      const createdTodo = await ToDo.create(req.body)
      res.json({ message: 'todo add' });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  //update todo by id
  router.put('/todos/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
      //affect todo to connected user
      const updatedTodo = await ToDo.findByIdAndUpdate(req.params.id, req.body, {new:true})
      await User.findByIdAndUpdate(req.user._id, {$push :{todos : createTodo._id}}, {new:true})
      
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  // delete todo by id
  router.delete('/todos/:id', async (req, res) => {
    try {
      const deletedTodo = await ToDo.findByIdAndDelete(req.params.id)
      res.json({ message: 'Todo deleted successfuly' });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })

module.exports = router;