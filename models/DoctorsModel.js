const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const DoctorsSchema = new mongoose.Schema(
{
avaibility: {

time_slots: { type: String },
days: { type: Number }},
doctor_id: {
type: String, 
unique: true, 
required: true, 
default : uuidv4

},
experiance_years: {
type: Number, 
},
specialization: {
type: String, 
maxLength: 255, 
},
licence_number: {
type: String, 
maxLength: 100, 
},
bio: {
type: String, 
},
user_id: {
type: String, 
},
},
);





module.exports = mongoose.model("Doctors", DoctorsSchema);
