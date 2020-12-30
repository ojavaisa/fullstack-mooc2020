const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();  // turn database-created id from object to string
    delete returnedObject._id;  // delete the returned id object
    delete returnedObject.__v;  // delete the database version information (not needed)
    delete returnedObject.passwordHash; // passwordHash should not be revealed
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;