const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const AppoinmentsSchema = new mongoose.Schema({
  appoinment_start_date: {
    type: Date,
  },
  appoinment_id: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4,
  },
  doctor_id: {
    type: String,
  },
  patient_id: {
    type: String,
  },
  consultation_mode: {
    type: String,
  },
  appointment_end_date: {
    type: Date,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Appoinments", AppoinmentsSchema);
