const express = require('express');
const router = express.Router();
const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;
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

  //affect todo to user
  router.put('/users/affect/:idUser/:idTodo', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.idUser, {$push :{todos : req.params.idTodo}}, {new:true})
      res.json(updatedUser);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  //desafect todo to user
  router.put('/users/desaffect/:idUser/:idTodo', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.idUser, {$pull :{todos : req.params.idTodo}}, {new:true})
      res.json(updatedUser);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })

  router.get('/users-with-todos', async (req, res) => {
    //find all users
    try {
      const users = await User.find({}).populate('todos',"name - _id");
      res.json(users);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })



  router.post("/login2", async (req, res) => {
    try {
      const user = await User.findOne({ firstName: req.body.firstName });
    console.log(user);
    console.log(req.body.password);
    console.log(user.password);
      if (user) {
        const cmp = await bcrypt.compare(req.body.password, user.password);
        if (cmp) {
          //   ..... further code to maintain authentication like jwt or sessions
          res.send("Auth Successful");
        } else {
          res.send("Wrong username or password.");
        }
      } else {
        res.send("Wrong username or password.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
  });
module.exports = router;