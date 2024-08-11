const Workout = require('../models/Workout.js');

const getWorkouts = async (req, res) => {
    try{
        const workouts = await Workout.find({userId: req.userId}).sort({createdAt:-1});
        res.status(200).json(workouts);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const postWorkout = async (req, res) => {
    try {
        const {title, reps, load} = req.body;
        const workout = await Workout.create({title, reps, load, userId: req.userId});
        res.status(200).json(workout);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const deleteWorkout = async (req, res) => {
    try{
        const {id} = req.params;
        const workout = await Workout.findByIdAndDelete(id);
        res.status(200).json(workout);
    }catch(err){
        res.status(400).json({error: "Could not delete the workout"})
    }
}

module.exports = {
    getWorkouts,
    postWorkout,
    deleteWorkout
}