const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({  //validointi vielä
  title: String,
  author: String,
  url: String,
  likes: Number
});

//noteSchema.set('toJSON', {...});  //toJSON-metodin määrittely vielä

module.exports = mongoose.model('Blog', blogSchema);