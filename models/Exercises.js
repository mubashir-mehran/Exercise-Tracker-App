// const { timeStamp } = require('console');
const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  activity: { type: String, required: true },
  duration: { type: Number, required: true },
  since: { type: Date, default: Date.now }
}, );


mongoose.models = {} 
module.exports =   mongoose.model("Exercises", ExerciseSchema);