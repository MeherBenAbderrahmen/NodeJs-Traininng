const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/userSchema');

passport.use(new BearerStrategy(
    async (token, done) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.userId);
            console.log(user);
            if (!user) {
                return done(null, false);
            } else {
                return done(null, user, { scope: 'all' });
            }
        } catch (error) {
            console.log(error)
            return done(null, false);
        }
        /* consol.log(token);
       User.findOne({ token: token },  (err, user) => {
         
       });*/
    }
));