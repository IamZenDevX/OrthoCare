const ErrorHandler = require('../utils/default/errorHandler');
const User = require('../models/user_masterModel');
const Doctors = require('../models/DoctorsModel');


exports.AddDoctor = async (req, res, next) => {
    const { avaibility, bio, experiance_years, licence_number, user_id, doctor_id, specialization } = req.body;
    let var_User_List;
    try {
        var_User_List = await User.findOne(
            {
                role: 'Doctor',
                user_id
            }, 'user_id ');
    } catch (err) {
        const error = new ErrorHandler(
            'Error While Finding User By Role !',
            500
        );
        return next(error);
    }
    if (!var_User_List) {
        const error = new ErrorHandler(
            'Error While Finding Doctor!',
            500
        );
        return next(error);

    }
    else {
    }
    let createdDoctors;
    try {
        createdDoctors = await Doctors.create({
            user_id: var_User_List.user_id,
            doctor_id,
            bio,
            specialization,
            experiance_years,
            licence_number,
            avaibility,
        });
    } catch (err) {
        const error = new ErrorHandler(
            'Error while inserting new Doctor data!',
            500
        );
        return next(error);
    }
    res.status(200);
    res.json({ 'Message': 'Doctor Data Inserted Successfully!!', 'doctor': createdDoctors });



}

exports.deletedoctor = async (req, res, next) => {
    const { doctor_id } = req.params;
    let deletedDoctors;
    try {
         deletedDoctors = await Doctors.deleteMany(
            {
                doctor_id
            },);
    } catch (err) {
        const error = new ErrorHandler(
            'Error While Deleteing Doctor Data!',
            500
        );
        return next(error);
    }
    res.status(200);
    res.json({ 'message': 'Doctor Data Deleted Successfully!!' });



}

exports.GetDoctor = async (req, res, next) => {
    const { experiance_years_min, experiance_years_max, licence_number, specialization } = req.query;
    let var_Doctors_List;
    try {
        var_Doctors_List = await Doctors.find(
            {
              $or: [
                { licence_number: licence_number },
                { specialization: specialization },
                {
                  $and: [
                    { experiance_years: { $gte: experiance_years_min } },
                    { experiance_years: { $lte: experiance_years_max } }
                  ]
                }
              ]
            }, 'bio doctor_id specialization avaibility experiance_years licence_number user_id ');
            
    } catch (err) {
        const error = new ErrorHandler(
            'Error While Finding Doctor Data !',
            500
        );
        return next(error);
    }
    
  
    res.status(200);
    res.json({ 'message': 'Doctor Data Selected Successfully!', 'Doctordata': var_Doctors_List });



}

exports.updatedoctor = async (req, res, next) => {
    const { avaibility, bio, experiance_years, licence_number, user_id, specialization } = req.body;
    const { doctor_id } = req.params;
    let updatedDoctors;
    try {
         updatedDoctors = await Doctors.updateMany(
            {
                doctor_id
            },
            {
                licence_number: licence_number,
                experiance_years: experiance_years,
                specialization: specialization,
                avaibility: avaibility,
                user_id: user_id,
                bio: bio
            }
            , { new: true });
    } catch (err) {
        const error = new ErrorHandler(
            'Error while updating Doctor Data!',
            400
        );
        return next(error);
    }
    res.status(200);
    res.json({ 'message': 'Doctor Data Updated Successfully!', 'updateddoctor': updatedDoctors });



}




