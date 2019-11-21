const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  topText: {
    type: String,
    required: true
  },
  bottomText: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Meme', schema);
