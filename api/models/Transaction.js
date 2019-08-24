const mongoose = require('mongoose');
const bcrypt = require("bcrypt");   
const jwt = require('jsonwebtoken');                                  // hashing+storing library.
const Schema   = mongoose.Schema;
const BCRYPT_HASH_STRENGTH = 12;                                      // COST-FACTOR of algorithm, we can change this according to strength of passwords we want.
var   uniqueValidator =require("mongoose-unique-validator");

let Transaction = new Schema({
  username: {    type: String, required: true, unique: true  },
  email:    {    type: String, required: true                },
  password: {    type: String, required: true, unique: true  }
},
{
    collection: 'transaction'
});

Transaction.methods.setPassword = function( passsword) {
  this.password = bcrypt.hashSync( this.password, BCRYPT_HASH_STRENGTH);
}

Transaction.methods.validatePassword = function( password) {
  return bcrypt.compareSync( password, this.password);
};

// to create and compare JWT tokens.
Transaction.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

Transaction.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    token: this.generateJWT(),
  };
};

Transaction.plugin(uniqueValidator);

// Transaction.methods.validPassword = function( password) {
//   return bcrypt.compareSync( password, this.passwordHash);
// };

// Transaction.virtual("passsword").set( function(value) {
//   this.passwordHash = bcrypt.hashSync(value, BCRYPT_HASH_STRENGTH);
// });

module.exports = mongoose.model('Transaction', Transaction);

