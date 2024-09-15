import express from 'express'; 
import http from 'http';
import {Server} from 'socket.io';

const app = express(); //creating an express app
const server = http.createServer(app); //creating an http server using the express app as request handler. 
const io = new Server(server, {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
}) //Creates a socket.io server sing the http as underlying protocol

io.on("connection", (socket) => { //Listen for connections to the io socket server. 
    console.log("Socket connection:", scoket.id);
    socket.on("disconnect", (req, res) => {//Listen for disconnections from the socket io server
        
    })
})

export {app, io, server};

/**
 * import express from 'express';
 * import {Server} from 'socket.io';
 * import http from 'http';
 * 
 * const app = express();
 * const server = http.createServer(app);
 * const io = new Server(server, {
 *  origin: ["htpp://localhost:3000"],
 *  methods: ["POST", "GET"]
 * })
 * 
 * export {app, server, io}
 */