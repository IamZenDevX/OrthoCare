const express = require("express");
const router = express.Router();

const {AddDoctor, deletedoctor, GetDoctor, updatedoctor} = require("../controller/doctorsController");
const { check } = require('express-validator');



router.post("/adddoctor",  AddDoctor);

router.delete("/deletdoctor/doctor_id/:doctor_id",  deletedoctor);

router.get("/getdoctor",  GetDoctor);

router.put("/updatedoctor/doctor_id/:doctor_id",  updatedoctor);

module.exports = router;