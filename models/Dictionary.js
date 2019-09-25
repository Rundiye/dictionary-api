const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dictionarySchema = new Schema({
  title: String,
  description: String,
  inputs: [{ type: Schema.Types.ObjectId, ref: 'Input' }]
});

const Dictionary = mongoose.model('Dictionary', dictionarySchema);

module.exports = Dictionary;
