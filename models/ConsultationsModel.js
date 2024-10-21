const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ConsultationsSchema = new mongoose.Schema(
{
appoinment_id: {
type: String, 
},
consultation_id: {
type: String, 
unique: true, 
required: true, 
default : uuidv4

},
doctor_id: {
type: String, 
},
patient_id: {
type: String, 
},
notes: {
type: String, 
},
prescriptions: {
type: String, 
},
video_recording: {
type: String, 
maxLength: 255, 
},
},
);





module.exports = mongoose.model("Consultations", ConsultationsSchema);
