import express from 'express';
const app = express();

app.get('/products', (req, res) => {
    res.send("works")
})

app.listen(3000, ()=>{
    console.log("Server started on http://localhost:5000")
})