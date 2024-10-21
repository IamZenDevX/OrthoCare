// const { validationResult } = require('express-validator');
const ErrorHandler = require("../utils/default/errorHandler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
// const { validationResult } = require('express-validator');
const user_master = require("../models/user_masterModel");
const Doctors = require("../models/DoctorsModel");
const Patients = require("../models/PatientsModel");

exports.ForgotPassword = async (req, res, next) => {
  const { email, password } = req.body;
  // Request validator error formatting
  const errorFormatter = ({ location, msg, param, value, path }) => {
    return `${location}:${path}[${value}]: ${msg}`;
  };
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.json({ errors: result.array() });
  }

  try {
    let var_User_List;
    try {
      var_User_List = await user_master.findOne(
        {
          email,
        },
        "email password "
      );
    } catch (err) {
      const error = new ErrorHandler("Error while finding user by email!", 500);
      return next(error);
    }
    if (!var_User_List) {
      const error = new ErrorHandler("Email Does not Exists!", 400);
      return next(error);
    } else {
    }
    let hashedPassword;
    let timestamp;
    //		Hash
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      const error = new ErrorHandler("Error while hashing password", 500);
      return next(error);
    }

    //		Current Date
    timestamp = Date.now();

    try {
      const updatedUser = await user_master.updateMany(
        {
          email,
        },
        {
          updated_at: timestamp,
          password: hashedPassword,
        },
        { new: true }
      );
    } catch (err) {
      const error = new ErrorHandler("Error while updating password!", 500);
      return next(error);
    }
    res.status(200);
    res.json({
      message: "Password changed successfully!",
      "new password": Req.Body.password,
    });
  } catch (err) {
    const error = new ErrorHandler("Internal Server Error!", 500);
    return next(error);
  }
};

exports.loginValidate = async (req, res, next) => {
  const { email, password } = req.body;
  // Request validator error formatting
  const errorFormatter = ({ location, msg, param, value, path }) => {
    return `${location}:${path}[${value}]: ${msg}`;
  };
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.json({ errors: result.array() });
  }

  let var_User_List;
  try {
    var_User_List = await user_master.findOne(
      {
        email,
      },
      "email password "
    );
  } catch (err) {
    const error = new ErrorHandler("Error while finding user by email!", 500);
    return next(error);
  }
  if (var_User_List === null) {
    const error = new ErrorHandler("user with this email not found!", 404);
    return next(error);
  } else {
    let validatepassword = false;
    try {
      validatepassword = await bcrypt.compare(password, var_User_List.password);
    } catch (err) {
      const error = new ErrorHandler("Error while validating password!", 500);
      return next(error);
    }
    if (validatepassword) {
      res.status(200);
      res.json({ message: "Logged in successfully!!" });
    } else {
      const error = new ErrorHandler("Invalid Password!", 400);
      return next(error);
    }
  }
};

exports.signup = async (req, res, next) => {
  const {
    address,
    created_at,
    date_of_birth,
    email,
    name,
    password,
    phone,
    profile_pic,
    role,
    updated_at,
  } = req.body;
  // Request validator error formatting
  const errorFormatter = ({ location, msg, param, value, path }) => {
    return `${location}:${path}[${value}]: ${msg}`;
  };
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.json({ errors: result.array() });
  }

  try {
    let TimeStamp;
    //		timestamp
    TimeStamp = Date.now();

    let var_User_List;
    try {
      var_User_List = await user_master.findOne(
        {
          email,
        },
        "email "
      );
    } catch (err) {
      const error = new ErrorHandler(
        "Error while getting email from user table",
        500
      );
      return next(error);
    }
    if (var_User_List) {
      const error = new ErrorHandler("Email Already Exists !", 400);
      return next(error);
    } else {
      let createdUser;
      try {
        createdUser = await user_master.create({
          name,
          profile_pic,
          date_of_birth,
          address,
          role,
          created_at: TimeStamp,
          email,
          phone,
          updated_at: TimeStamp,
          password,
        });
      } catch (err) {
        const error = new ErrorHandler(
          "Error while inserting new user data!",
          500
        );
        return next(error);
      }
      let var_User_List_user_id;
      var_User_List_user_id = await user_master.findOne(
        {
          email: createdUser.email,
        },
        "user_id "
      );
      if (role == "Doctor") {
        let createdDoctors;
        try {
          createdDoctors = await Doctors.create({
            user_id: var_User_List_user_id.user_id,
          });
        } catch (err) {
          const error = new ErrorHandler(
            "Error while inserting new Doctor data!",
            500
          );
          return next(error);
        }
      } else if (role == "Patient") {
        let createdPatients;
        try {
          createdPatients = await Patients.create({
            user_id: var_User_List_user_id.user_id,
          });
        } catch (err) {
          const error = new ErrorHandler(
            "Error While Inserting new Patients Data!",
            500
          );
          return next(error);
        }
      } else {
      }
      res.status(200);
      res.json({ message: "SignUp Successfully !", user: createdUser });
    }
  } catch (err) {
    const error = new ErrorHandler("Internal Server Error", 500);
    return next(error);
  }
};

exports.UpdateProfile = async (req, res, next) => {
  const {
    address,
    created_at,
    date_of_birth,
    email,
    name,
    phone,
    profile_pic,
    updated_at,
  } = req.body;
  const { user_id } = req.params;
  let timestamp;
  //		timestamp
  timestamp = Date.now();

  try {
    const updatedUser = await user_master.updateMany(
      {
        user_id,
      },
      {
        date_of_birth: date_of_birth,
        updated_at: timestamp,
        address: address,
        created_at: created_at,
        profile_pic: profile_pic,
        phone: phone,
        email: email,
        name: name,
      },
      { new: true }
    );
  } catch (err) {
    const error = new ErrorHandler("Error while updating user", 500);
    return next(error);
  }
  res.status(200);
  res.json({ message: "User Updated Successfully!", updateduser: updatedUser });
};
