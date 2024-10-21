const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ExercisesSchema = new mongoose.Schema(
{
exercise_id: {
type: String, 
unique: true, 
required: true, 
default : uuidv4

},
title: {
type: String, 
maxLength: 255, 
},
description: {
type: String, 
},
video_url: {
type: String, 
maxLength: 255, 
},
difficulty_level: {
type: String, 
},
target_area: {
type: String, 
maxLength: 255, 
},
duration_minutes: {
type: Number, 
},
repetitions: {
type: Number, 
},
},
);





module.exports = mongoose.model("Exercises", ExercisesSchema);
