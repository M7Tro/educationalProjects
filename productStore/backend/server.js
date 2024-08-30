import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import productRouter from './routes/product.router.js'
//Importing the path module to later make configuration for building and development:
import path from 'path';

dotenv.config()
const app = express();

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{app.listen(PORT, console.log("Listening on port " + PORT))})

app.use(express.json());
app.use((req, res, next) => {
    console.log("Received request: ", req.method, req.path);
    next();
})

app.use("/api/products", productRouter);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "frontend", "dist")));
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    })
}