const express = require("express");
const router = express.Router();

const {ForgotPassword, loginValidate, signup, UpdateProfile} = require("../controller/UsersController");
const { check } = require('express-validator');



router.post("/forgotpassword", [
check('email')
.isEmail()
.not()
.isEmpty(),
check('password')
.not()
.isEmpty()],  ForgotPassword);

router.post("/login", [
check('email')
.isEmail()
.not()
.isEmpty(),
check('password')
.not()
.isEmpty()],  loginValidate);

router.post("/signup", [
check('email')
.isEmail()
.not()
.isEmpty(),
check('password')
.not()
.isEmpty()],  signup);

router.put("/updateprofile/user_id/:user_id",  UpdateProfile);

module.exports = router;