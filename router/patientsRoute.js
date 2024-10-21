const express = require("express");
const router = express.Router();

const {addPatients, assignDoctor, deletePatients, getAssignDoctor, getPatientByDoctor, updatePatients} = require("../controller/patientsController");



router.post("/addpatients",  addPatients);

router.put("/assigndoctor/patient_id/:patient_id",  assignDoctor);

router.delete("/deletepatient/patient_id/:patient_id",  deletePatients);

router.get("/getassigndoctor/patient_id/:patient_id",  getAssignDoctor);

router.get("/getpatient/doctor_id/:doctor_id",  getPatientByDoctor);

router.put("/updatepatients/patient_id/:patient_id",  updatePatients);

module.exports = router;