const ErrorHandler = require('../utils/default/errorHandler');
const Consultations = require('../models/ConsultationsModel');


exports.AddConsultation = async (req, res, next) => {
    const { appoinment_id, doctor_id, patient_id, notes, prescriptions, video_recording } = req.body;
    let createdConsultations;
    try {
        createdConsultations = await Consultations.create({
            notes,
            appoinment_id,
            patient_id,
            doctor_id,
            prescriptions,
            video_recording,
        });
    } catch (err) {
        const error = new ErrorHandler(
            'Error while inserting new Consultation data!',
            500
        );
        return next(error);
    }
    res.status(200);
    res.json({ 'message': 'Data Inserted !', 'data': createdConsultations });



}

exports.DeleteConsultation = async (req, res, next) => {
    const { consultation_id } = req.params;
    let deletedConsultations;
    try {
        deletedConsultations = await Consultations.deleteMany(
            {
                consultation_id
            },);
    } catch (err) {
        const error = new ErrorHandler(
            'Error While Deleteing Consultation Data!',
            500
        );
        return next(error);
    }
    res.status(200);
    res.json({ 'message': 'Data Deleted !', 'data': deletedConsultations });



}

exports.GetConsultation = async (req, res, next) => {
    const { consultation_id } = req.params;
    const { appoinment_id, doctor_id, patient_id } = req.query;
    let var_Consultations_List;
    try {
        var_Consultations_List = await Consultations.find(
            {
                $or: [
                    { consultation_id: consultation_id },
                    { appoinment_id: appoinment_id },
                    {doctor_id:doctor_id},
                    {patient_id:patient_id}
                ]
            }, 'patient_id prescriptions consultation_id notes doctor_id video_recording appoinment_id ');
    } catch (err) {
        const error = new ErrorHandler(
            'Error while selecting Consultation !',
            500
        );
        return next(error);
    }
    res.status(200);
    res.json({ 'message': 'Data Selected !' });



}

exports.UpdateConsultation = async (req, res, next) => {
    const { appoinment_id, doctor_id, notes, patient_id, prescriptions, video_recording } = req.body;
    const { consultation_id } = req.params;
    let updatedConsultations;
    try {
         updatedConsultations = await Consultations.updateMany(
            {
                consultation_id
            },
            {
                appoinment_id: appoinment_id,
                prescriptions: prescriptions,
                notes: notes,
                video_recording: video_recording,
                consultation_id: consultation_id,
                patient_id: patient_id,
                doctor_id: doctor_id
            }
            , { new: true });
    } catch (err) {
        const error = new ErrorHandler(
            'Error While Updating Consultation data !',
            500
        );
        return next(error);
    }
    res.status(200);
    res.json({ 'message': 'Data Updated !', 'data': updatedConsultations });



}




