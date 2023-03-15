import jwt from "jsonwebtoken";
import Exercise from "../models/Exercises";
// import User from "../database/models/users";

// export const getAllExercises = async (req, res) => {
//   try {
//     const token = req.query.token;
//     const { id } = jwt.verify(token, process.env.SECRET);
//     const allExercies = await Exercise.find({userId:id}).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: allExercies });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getExercise = async (req, res) => {
//   const { id } = req.query;
//   try {
//     const exercise = await Exercise.findById(id);
//     res.status(200).json({ success: true, data: exercise });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const addExercise = async (req, res) => {
//   const { name, description, activityType, duration, date } = req.body;
//   if (!name && !description && !activityType && !duration && !date) {
//     return res
//       .status(404)
//       .json({ success: false, message: "please fill all fields" });
//   }
//   try {
//     const token = req.cookies.token;
//     const { id } = jwt.verify(token, process.env.SECRET);
//     const created = await Exercise.create({
//       userId: id,
//       name: name,
//       description: description,
//       activityType: activityType,
//       duration: duration,
//       date: date
//     });
//     if (!created) {
//       return res
//         .status(400)
//         .json({ success: false, message: "activity not created" });
//     }
//     // const exercisesUpdated = await User.findByIdAndUpdate(
//     //   tokenVerification.id,
//     //   { $push: { exercises: created._id } },
//     //   { new: true }
//     // );
//     // console.log(exercisesUpdated);
//     res.status(201).json({ success: true, message: "Activity Created" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
export const deleteExercise = async (req, res) => {
  const { id } = req.query;
  try {
    const exercise = await Exercise.findByIdAndDelete(id);
    if (!exercise) { return res.status(404).json({ success: false, message: 'exercise not deleted' }) }
    return res.status(200).json({ success: true, message: 'exercise deleted', data: exercise });
  } catch (err) { res.status(500).json({ success: false, message: err.name }) }
};
// export const updateExercise = async (req, res) => {
//   const { id } = req.query;
//   try {
//     const updated = await Exercise.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updated) { return res.status(404).json({ success: false, message: 'exercise not updated' }) }
//     return res.status(200).json({ success: true, message: 'exercise updated', data: updated });
//   } catch (err) { res.status(500).json({ success: false, message: err.name }) }
// };