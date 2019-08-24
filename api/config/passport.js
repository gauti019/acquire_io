const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Transaction = mongoose.model('Transaction');             // switching between the two.


module.exports = function(passport) {

        passport.use( new LocalStrategy(
            {
            usernameField: 'username',
            passwordField: 'password'
            },
        (username, password, done) => {
            Transaction.findOne( {username} )
                    .then( (user) => {
                            if( !user || !user.validatePassword(password) )
                                return done(null, false, {errors: {'email or password': 'is invalid'} });
                            
                            return done( null, user);
                    })
                    .catch( done);
        }
        ));

        passport.serializeUser( function(user, done) {
            done( null, user._id);
        });
        
        passport.deserializeUser( function(userId, done) {
            Transaction.findById( userId, (err, user) => done(err,user) );
        });
}



