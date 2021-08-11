const express = require('express');
const router = express.Router();
const ToDo = require('../models/todoSchema')

//get all todo
router.get('/todos', async (req, res) => {
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
  router.get('/todo/:id', async (req, res) => {
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
  router.put('/todo/:id', async (req, res) => {
    try {
      const updatedTodo = await ToDo.findByIdAndUpdate(req.params.id, req.body, {new:true})
      res.json(updatedTodo);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  // delete todo by id
  router.delete('/todo/:id', async (req, res) => {
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