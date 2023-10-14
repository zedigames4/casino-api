import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  images: {
    type: Array<String>,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
});

GameSchema.set('timestamps', true);

const Game = mongoose.model('Game', GameSchema);

export default Game;
