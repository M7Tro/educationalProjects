import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.router.js';
import messageRouter from './routes/message.router.js';
import usersRouter from './routes/user.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT, ()=>{console.log("Listening on port", PORT)})
    })

//Middleware: (json parser, cookie parser, logger)
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next)=>{
    console.log("Received request: ", req.method, req.path);
    next();
})

//Routers:
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", usersRouter);