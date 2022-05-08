const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name cannot be left blank'],
    },
    email: {
      type: String,
      required: [true, 'Email cannot be left blank'],
    },
    password: {
      type: String,
      required: [true, 'Password cannot be left blank'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
