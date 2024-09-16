import express from 'express'; 
import http from 'http';
import {Server} from 'socket.io';

const app = express(); //creating an express app
const server = http.createServer(app); //creating an http server using the express app as request handler. 
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5713"],
        methods: ["GET", "POST"]        
    }
}) //Creates a socket.io server using the http as underlying protocol

io.on("connection", (socket) => { //Listen for connections to the io socket server. 
    console.log("Socket connection:", socket.id);
    socket.on("disconnect", (req, res) => {//Listen for disconnections from the socket io server
    })
})

export {app, io, server};