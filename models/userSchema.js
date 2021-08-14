const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  age: Number,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [{type: Schema.Types.ObjectId, ref:'todo'}]
},{
  versionKey:false,
  timestamps: true
});
const User = mongoose.model('users', userSchema);
module.exports = User;