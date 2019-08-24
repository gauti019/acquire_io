const mongoose = require('mongoose')
const passport = require('passport')
const router = require('express').Router()
const auth = require('../auth')
const Transaction = mongoose.model('Transaction');             // switching between the two.


// THIS WILL BE USED FOR REGISTRATION, i.e. signing in of user i.e. saving to database.
router.post('/register', auth.optional, (req, res, next) => {
    // const { body: { user } } = req;
    let user = req.body;

    if (!user.username) {
        return res.status(422).json({
            errors: { 'username': 'is required' },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: { 'password': 'is required' }
        });
    }

    let finalUser = new Transaction(user);
    // finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post('/login', auth.optional, (req, res, next) => {
    const user = req.body;

    Transaction.findOne({ username: user.username, password:user.password}, {_id:1,password:1}, function (err, transaction) {
        if (err) {
            console.log(err, 'failure');
            return res.json({ authenticated: false });
        }
        if(transaction && transaction._id){
            return res.status(200).json({ authenticated: true, id: transaction._id});
        }
        else
            return res.json({ authenticated: false });
    });
});

// to check whether a new username is available or not.
router.get(`/validate/:uname`, auth.optional, (req, res) => {

    let uname = req.params.uname;

    Transaction.findOne({ username: uname }, function (err, transaction) {
        if (err) {
            console.log(err + 'failure');
            res.json({ transaction, usernameIsUnique: false });
        }
        if (!err) {
            res.json({ transaction });
        }
    });
});

// get current route, only authenticated users can access it.
router.get('/current', auth.required, (req, res, next) => {

    const id = req.payload;

    return Transaction.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });
});

module.exports = router;