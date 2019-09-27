const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inputSchema = new Schema({
  domain: String,
  range: String,
  dictionary: { type: Schema.Types.ObjectId, ref: 'Dictionary' }
});

const Input = mongoose.model('Input', inputSchema);

module.exports = Input;
