const express = require('express');
const router = express.Router();
const User = require('../models/userSchema')

//get all user
router.get('/users', async (req, res) => {
    //find all users
    try {
      const users = await User.find({});
      res.json(users);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  //get one use by id
  router.get('/user/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      res.json(user);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  // add one user
  router.post('/users', async (req, res) => {
    try {
      console.log(req.body);
      const createdUser = await User.create(req.body)
      res.json({ message: 'user add' });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  //update user by id
  router.put('/user/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
      res.json(updatedUser);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  // delete user by id
  router.delete('/user/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id)
      res.json({ message: 'user deleted successfuly' });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })

module.exports = router;