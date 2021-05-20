const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
  name: String,
  surname: String,
  age: Number,
  gender: String,
});

module.exports = mongoose.model('Person', PersonSchema)