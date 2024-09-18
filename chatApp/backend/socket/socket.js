import express from 'express'; 
import http from 'http';
import {Server} from 'socket.io';

const app = express(); //creating an express app
const httpServer = http.createServer(app); //creating an http server using the express app as request handler. 
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true   
    }
}) //Creates a socket.io server using the http as underlying protocol

const userSocketMap = {};

io.on("connection", (socket) => { //Listen for connections to the io socket server. 
    const userId = socket.handshake.query.userId;
    if(userId != undefined){
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
    socket.on("disconnect", (req, res) => {//Listen for disconnections from the socket io server
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export {app, io, httpServer};

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}