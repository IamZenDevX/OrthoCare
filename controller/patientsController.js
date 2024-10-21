const ErrorHandler = require("../utils/default/errorHandler");
const user_master = require("../models/user_masterModel");
const Patients = require("../models/PatientsModel");

exports.addPatients = async (req, res, next) => {
  const { assigned_doctor, current_condition, medical_history, user_id } =
    req.body;
 
  let createdPatients;
  try {
    createdPatients = await Patients.create({
      current_condition,
      medical_history,
      assigned_doctor,
      user_id,
    });
  } catch (err) {
    const error = new ErrorHandler(
      "Error While Inserting new Patients Data!",
      500
    );
    return next(err);
  }
  res.status(200);
  res.json({ message: "Data Inserted Successfully!", data: createdPatients });
};

exports.assignDoctor = async (req, res, next) => {
  const { doctor_id } = req.body;
  const { patient_id } = req.params;
  let updatedPatients ;
  try {
     updatedPatients = await Patients.updateMany(
      {
        patient_id,
      },
      {
        assigned_doctor: doctor_id,
      },
      { new: true }
    );
  } catch (err) {
    const error = new ErrorHandler("Error While Updating Assign Doctor!", 500);
    return next(error);
  }
  res.status(200);
  res.json({ message: "Data Updated Successfully!", data: updatedPatients });
};

exports.deletePatients = async (req, res, next) => {
  const { patient_id } = req.params;
  let deletedPatients ;
  try {
    deletedPatients  = await Patients.findOneAndDelete(patient_id);
  } catch (err) {
    const error = new ErrorHandler("Error While Deleteing Patients Data!", 500);
    return next(error);
  }
  res.status(200);
  res.json({ message: "Data Deletedd Successfully!" });
};

exports.getAssignDoctor = async (req, res, next) => {
  const { patient_id } = req.params;
  let var_Patients_List;
  try {
    var_Patients_List = await Patients.findOne(
      {
        patient_id,
      },
      "user_id assigned_doctor patient_id current_condition medical_history "
    );
  } catch (err) {
    const error = new ErrorHandler("Error while selecting patients data!", 500);
    return next(error);
  }
  res.status(200);
  res.json({ message: "Data Selected Successfully!", data: var_Patients_List });
};

exports.getPatientByDoctor = async (req, res, next) => {
  const { doctor_id } = req.params;
  let var_Patients_List;
  try {
    var_Patients_List = await Patients.find(
      {
        assigned_doctor: doctor_id,
      },
      "patient_id current_condition user_id assigned_doctor medical_history "
    );
  } catch (err) {
    const error = new ErrorHandler(
      "Error while selecting patients by doctor data!",
      500
    );
    return next(error);
  }
  res.status(200);
  res.json({ message: "Data Selcted Successfully!", data: var_Patients_List });
};

exports.updatePatients = async (req, res, next) => {
  const { assigned_doctor, current_condition, user_id, medical_history } =
    req.body;
  const { patient_id } = req.params;
  let updatedPatients;
  try {
    updatedPatients  = await Patients.findByIdAndUpdate(
      patient_id,
      {
        assigned_doctor: assigned_doctor,
        user_id: user_id,
        current_condition: current_condition,
        medical_history: medical_history,
      },
      { new: true }
    );
  } catch (err) {
    const error = new ErrorHandler("Error while updating Patients Data!", 500);
    return next(error);
  }
  res.status(200);
  res.json({ message: "Data Updated Successfully!", data: updatedPatients });
};
