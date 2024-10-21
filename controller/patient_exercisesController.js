const ErrorHandler = require('../utils/default/errorHandler');
const Patient_Exercises = require('../models/Patient_ExercisesModel');


exports.AddPatientExercises = async (req, res, next) => {
    const { assigned_by, end_date, exercise_id, patient_id, progress, start_date, status } = req.body;
    let createdPatient_Exercises;
    try {
        createdPatient_Exercises = await Patient_Exercises.create({
            end_date,
            patient_id,
            assigned_by,
            start_date,
            progress,
            status,
            exercise_id,
        });
    } catch (err) {
        const error = new ErrorHandler(
            'Error while inserting new Patient Exercises data!',
            500
        );
        return next(error);
    }
    res.status(200);
    res.json({ 'messages': 'Data Inserted Successfully!', 'data': createdPatient_Exercises });



}

exports.getpatientexercises = async (req, res, next) => {
    const { Patient_Exercises_ID } = req.params;
    let var_Patient_Exercises_List;
    try {
        var_Patient_Exercises_List = await Patient_Exercises.findOne(
            {
                patient_exercies_id: Patient_Exercises_ID
            }, 'start_date status assigned_by exercise_id patient_id patient_exercies_id progress end_date ');
    } catch (err) {
        const error = new ErrorHandler(
            'Error While Finding Pateint Exercises Data !',
            500
        );
        return next(error);
    }
    res.status(200);
    res.json({ 'message': 'Data Selected Successfully!', 'data': var_Patient_Exercises_List });



}

exports.UpdatePatient_Exercises = async (req, res, next) => {
    const { progress, status } = req.body;
    const { patient_exercies_id } = req.params;
    let updatedPatient_Exercises
    try {
         updatedPatient_Exercises = await Patient_Exercises.updateMany(
            {
                patient_exercies_id
            },
            {
                progress: progress,

                patient_exercies_id: patient_exercies_id,
                status: status,
                
}
            , { new: true });
    } catch (err) {
        const error = new ErrorHandler(
            'Error while Updating Patient Exercises data!',
            500
        );
        return next(error);
    }
    res.status(200);
    res.json({ 'message': 'Data Updated Successfully!', 'data': updatedPatient_Exercises });



}




