const express = require('express');
const router = express.Router();
const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// add one user
router.post('/register', async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email });
        if (userFound) {
            res.send({ message: 'email already exist, please choose another email' });
        } else {

            const hashedPwd = await bcrypt.hash(req.body.password, 10);
            const createdUser = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                email: req.body.email,
                password: hashedPwd,
            });
            res.json({ message: 'user add' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const cmp = await bcrypt.compare(req.body.password, user.password);
            if (cmp) {
                //create of jwt token
                const tokenData = {
                    userId:user._id,
                    email: user.email
                };
                const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
                res.send({ message: 'Auth Successful', token: token });
            } else {
                res.send({ messsage: 'Wrong email or password.' });
            }
        } else {
            res.send({ message: 'Wrong email or password.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }
});

module.exports = router;