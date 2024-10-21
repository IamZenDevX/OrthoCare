const ErrorHandler = require("../utils/default/errorHandler");
const Exercises = require("../models/ExercisesModel");

exports.addExercises = async (req, res, next) => {
  const {
    description,
    difficulty_level,
    duration_minutes,
    repetitions,
    target_area,
    title,
    video_url,
  } = req.body;
  let createdExercises;
  try {
    createdExercises = await Exercises.create({
      video_url,
      description,
      target_area,
      repetitions,
      title,
      difficulty_level,
      duration_minutes,
    });
  } catch (err) {
    const error = new ErrorHandler(
      "Error while inserting new Exercises data!",
      500
    );
    return next(error);
  }
  res.status(200);
  res.json({ message: "Data inserted Successfully!", data: createdExercises });
};

exports.deleteExercises = async (req, res, next) => {
  const { exercise_id } = req.params;
  let deletedExercises;
  try {
     deletedExercises = await Exercises.deleteMany({
      exercise_id,
    });
  } catch (err) {
    const error = new ErrorHandler(
      "Error While Deleteing Exercises Data!",
      500
    );
    return next(error);
  }
  res.status(200);
  res.json({ message: "Data Deleted Successfully!" });
};

exports.getExercise = async (req, res, next) => {
  const { exercise_id } = req.params;
  let var_Exercises_List;
  try {
    var_Exercises_List = await Exercises.findOne(
      {
        exercise_id,
      },
      "duration_minutes target_area exercise_id difficulty_level title repetitions video_url description "
    );
  } catch (err) {
    const error = new ErrorHandler("Error While Finding Exercises Data !", 500);
    return next(error);
  }
  res.status(200);
  res.json({
    message: "Exercises Data Selected Successfully!",
    data: var_Exercises_List,
  });
};

exports.updateExercies = async (req, res, next) => {
  const {
    description,
    difficulty_level,
    duration_minutes,
    repetitions,
    target_area,
    title,
    video_url,
  } = req.body;
  const { exercise_id } = req.params;
  let updatedExercises;
  try {
     updatedExercises = await Exercises.updateMany(
      {
        exercise_id,
      },
      {
        video_url: video_url,
        repetitions: repetitions,
        difficulty_level: difficulty_level,
        description: description,
        duration_minutes: duration_minutes,
        title: title,
        target_area: target_area,
      },
      { new: true }
    );
  } catch (err) {
    const error = new ErrorHandler("Error while updating Excercise data!", 500);
    return next(error);
  }
  res.status(200);
  res.json({ message: "Data Updated Successfully!", data: updatedExercises });
};
