const mongoose = require('mongoose');
const schema   = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const BCRYPT_HASH_STRENGTH = 12;


let Transaction = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, require: true },
},
 {
   collection: 'transaction'
 });

 Transaction.method.validPassword = function(password) {
   return bcrypt.compareSync( password, this.passwordHash);
 };

 Transaction.virtual("password").set( function(value) {
  this.passwordHash = bcrypt.hashSync(value, BCRYPT_HASH_STRENGTH);
 });

 Transaction.plugin(uniqueValidator);

 module.exports = mongoose.model('Transaction', Transaction);


)
