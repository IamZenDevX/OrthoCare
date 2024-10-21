const express = require("express");
const router = express.Router();

const {addExercises, deleteExercises, getExercise, updateExercies} = require("../controller/ExercisesController");



router.post("/addExercises",  addExercises);

router.delete("/deleteexercises/exercise_id/:exercise_id",  deleteExercises);

router.get("/getexercise/exercise_id/:exercise_id",  getExercise);

router.put("/updateexercies/exercise_id/:exercise_id",  updateExercies);

module.exports = router;