const mongoose = require('mongoose');

const FavsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
}, { versionKey: false, _id: false });

const ListsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  refUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  favs: {
    type: [FavsSchema],
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('List', ListsSchema);
