const {Router} = require('express');
const workoutController = require('../controllers/workoutController.js');

const router = Router();

//Getting workouts of a user:
router.get('/', workoutController.getWorkouts);

//Posting new workouts of a user: 
router.post('/', workoutController.postWorkout);

//deleting a specific workout: 
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;