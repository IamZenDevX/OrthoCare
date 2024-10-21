const ErrorHandler = require("../utils/default/errorHandler");
const Appoinments = require("../models/AppoinmentsModel");

exports.addAppoinment = async (req, res, next) => {
  const {
    appointment_start_date,
    appointment_end_date,
    consultation_mode,
    doctor_id,
    patient_id,
    status,
  } = req.body;

  let var_Appoinments_List;
  try {
    var_Appoinments_List = await Appoinments.find(
      {
        $or: [
          { appointment_start_date: { $gte: appointment_start_date } },
          { appointment_end_date: { $lte: appointment_end_date } },
        ],
      },
      "status "
    );
  } catch (err) {
    const error = new ErrorHandler(
      "Error while selecting appoinment time!",
      500
    );
    return next(error);
  }
  //		Checking Time slot
  console.log(var_Appoinments_List.length)
  if (var_Appoinments_List.length > 0) {
    const error = new ErrorHandler(
      "Time slot overlaps with existing appointments.",
      500
    );
    return next(error);
  }

  let createdAppoinments;
  try {
    createdAppoinments = await Appoinments.create({
      appointment_end_date,
      consultation_mode,
      appointment_start_date,
      patient_id,
      status,
      doctor_id,
    });
  } catch (err) {
    const error = new ErrorHandler(
      "Error while inserting new Appointment data!",
      500
    );
    return next(error);
  }
  res.status(200);
  res.json({
    message: "Data Inserted Successfully!",
    data: createdAppoinments,
  });
};

exports.getAppoinments = async (req, res, next) => {
  const { appointment_id, patient_id, doctor_id } = req.query;
  let var_Appoinments_List;
  try {
    var_Appoinments_List = await Appoinments.find(
      {
        appoinment_id: appointment_id,
        patient_id,
        doctor_id,
      },
      "doctor_id appoinment_id patient_id consultation_mode appoinment_start_date status appointment_end_date "
    );
  } catch (err) {
    const error = new ErrorHandler("Error while selecting appoinment!", 400);
    return next(error);
  }
  res.status(200);
  res.json({
    message: "Data Selecetd SUccessfully!",
    data: var_Appoinments_List,
  });
};

exports.updateAppointment = async (req, res, next) => {
  const {
    appointment_start_date,
    appointment_end_date,
    doctor_id,
    consultation_mode,
    patient_id,
    status,
  } = req.body;
  const { appoinment_id } = req.params;
  if (status == "Scheduled") {
    let var_Appoinments_List;
    try {
      var_Appoinments_List = await Appoinments.find(
        {
          
             appointment_start_date: { $gte: appointment_start_date } ,
            appointment_end_date: { $lte: appointment_end_date } },
        
        
        "status "
      );
    } catch (err) {
      const error = new ErrorHandler(
        "Error while selecting appoinment time!",
        500
      );
      return next(error);
    }
    //		checking time slot
    if (var_Appoinments_List.length > 0) {
      const error = new ErrorHandler(
        "Time slot overlaps with existing appointments.",
        500
      );
      return next(error);
    }
    let updatedAppoinments;
    try {
      updatedAppoinments = await Appoinments.updateMany(
        {
          appoinment_id,
        },
        {
          consultation_mode: consultation_mode,
          status: status,
          appointment_start_date: appointment_start_date,
          patient_id: patient_id,
          appointment_end_date: appointment_end_date,
          doctor_id: doctor_id,
        },
        { new: true }
      );
    } catch (err) {
      const error = new ErrorHandler(
        "Error while updating Appointment Data!",
        500
      );
      return next(error);
    }
    res.status(200);
    res.json({
      message: "Data Upated Successfully!",
      data: updatedAppoinments,
    });
  } else {
    let updatedAppoinments_slot;
    try {
      updatedAppoinments_slot = await Appoinments.updateMany(
        {
          appoinment_id,
        },
        {
          status: status,
          consultation_mode: consultation_mode,
          appointment_start_date: "",
          appointment_end_date: "",
          patient_id: patient_id,
          doctor_id: doctor_id,
        },
        { new: true }
      );
    } catch (err) {
      const error = new ErrorHandler(
        "Error while updating Appointment slot Data!",
        500
      );
      return next(error);
    }
    res.status(200);
    res.json({
      message: "Data Updated Successfully!",
      data: updatedAppoinments_slot,
    });
  }
};
