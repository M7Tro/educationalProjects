import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/product.router.js'

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{console.log("Listening on port: ", process.env.PORT)})
    })

app.use(express.json());

app.use("/api/products", productRouter);