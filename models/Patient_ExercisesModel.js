const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Patient_ExercisesSchema = new mongoose.Schema(
{
assigned_by: {
type: String, 
},
exercise_id: {
type: String, 

},
patient_exercies_id: {
type: String, 
unique: true, 
required: true, 
default : uuidv4

},
patient_id: {
type: String, 
},
start_date: {
type: Date, 
},
end_date: {
type: Date, 
},
status: {
type: String, 
},
progress: {
type: String, 
},
},
);





module.exports = mongoose.model("Patient_Exercises", Patient_ExercisesSchema);
