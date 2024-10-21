const express = require("express");
const router = express.Router();

const {AddPatientExercises, getpatientexercises, UpdatePatient_Exercises} = require("../controller/patient_exercisesController");



router.post("/addpatientexercises",  AddPatientExercises);

router.get("/getpatientexercises/Patient_Exercises_ID/:Patient_Exercises_ID",  getpatientexercises);

router.put("/updatepatientexercises/patient_exercies_id/:patient_exercies_id",  UpdatePatient_Exercises);

module.exports = router;