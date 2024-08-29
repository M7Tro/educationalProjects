import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import productRouter from './routes/product.router.js'

dotenv.config()
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{app.listen(PORT, console.log("Listening on port " + PORT))})

app.use(express.json());
app.use((req, res, next) => {
    console.log("Received request: ", req.method, req.path);
    next();
})

app.use("/api/products", productRouter);