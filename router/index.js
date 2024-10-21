const express = require("express");
const router = express.Router();

const appointmentRoute = require("./appointmentRoute");
const consultationRoute = require("./consultationRoute");
const doctorsRoute = require("./doctorsRoute");
const ExercisesRoute = require("./ExercisesRoute");
const messagesRoute = require("./messagesRoute");
const patient_exercisesRoute = require("./patient_exercisesRoute");
const patientsRoute = require("./patientsRoute");
const UsersRoute = require("./UsersRoute");

router.use("/appointment", appointmentRoute);
router.use("/consultation", consultationRoute);
router.use("/doctor", doctorsRoute);
router.use("/exercises", ExercisesRoute);
router.use("/messages", messagesRoute);
router.use("/patientexercises", patient_exercisesRoute);
router.use("/patients", patientsRoute);
router.use("/users", UsersRoute);

module.exports = router;
