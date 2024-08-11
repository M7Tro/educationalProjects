require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter.js')
const requireAuth = require('./middleware/requireAuth.js');
const workoutRouter = require('./routes/workoutRouter.js');

const app = express();

mongoose.connect(process.env.DB_URI)
    .then(()=>{app.listen(process.env.PORT); console.log("Connected to the database on port " + process.env.PORT)});

//middleware:
app.use(express.json());
app.use((req, res, next)=>{
    console.log("Receieved request: ", req.method, req.path);
    next();
})

//Routing:
app.use('/api/workouts', userRouter);

//Middleware for checking the jsonwebtoken: (must go after login and signup)
app.use(requireAuth);

//Router for accessing workouts from the database:
app.use('/api/workouts', workoutRouter);