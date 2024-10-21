const express = require("express");
const router = express.Router();

const {addAppoinment, getAppoinments, updateAppointment} = require("../controller/appointmentController");



router.post("/appappoinment",  addAppoinment);

router.get("/getappoinments",  getAppoinments);

router.put("/updateappoinment/appoinment_id/:appoinment_id",  updateAppointment);

module.exports = router;