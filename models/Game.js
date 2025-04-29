const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true,
    trim: true
  },
  numberOfPlayer: {
    type: Number,
    required: true
  },
  gameDuration: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Game', gameSchema);
