const mongoose = require("mongoose");
const {v4:uuidv4}=require('uuid');

const PatientsSchema = new mongoose.Schema(
{
assigned_doctor: {
type: String, 
},
patient_id: {
type: String, 
unique: true, 
required: true, 
default : uuidv4
},
medical_history: {
type: String, 
},
user_id: {
type: String, 
},
current_condition: {
type: String, 
maxLength: 255, 
},
},
);





module.exports = mongoose.model("Patients", PatientsSchema);
