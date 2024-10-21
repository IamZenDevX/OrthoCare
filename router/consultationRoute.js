const express = require("express");
const router = express.Router();

const {AddConsultation, DeleteConsultation, GetConsultation, UpdateConsultation} = require("../controller/consultationController");



router.post("/addconsultation",  AddConsultation);

router.delete("/deleteconsultation/consultation_id/:consultation_id",  DeleteConsultation);

router.get("/getconsultation/consultation_id/:consultation_id",  GetConsultation);

router.put("/updateconsultation/consultation_id/:consultation_id",  UpdateConsultation);

module.exports = router;