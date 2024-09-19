import Conversation from '../models/Conversation.model.js';
import Message from '../models/Message.model.js';
import { getReceiverSocketId } from '../socket/socket.js';
import { io } from '../socket/socket.js';

export const sendMessage = async (req,res) => {
    try{
        const {id:receiverId} = req.params;
        const senderId = req.userId;
        const {message} = req.body;

        let conversation = await Conversation.findOne({participants: {$all: [senderId, receiverId]}});
        if(!conversation){
            conversation = await new Conversation({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = await new Message({
            senderId,
            receiverId,
            message 
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }        

        await Promise.all([conversation.save(), newMessage.save()]);

        //Socket functionality:
        const receiverSocketId = getReceiverSocketId(senderId);
        //If the user is online, we:
        if(receiverSocketId){
            //Instead of io.emit, we use the specific io.to()
            //console.log("Sending the new message wit socket: ", newMessage);
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
    
        return res.status(200).json({createdAt: newMessage.createdAt, message: newMessage.message, senderId: newMessage.senderId});
    }catch(err){
        console.log("Error during sendMessage:", err.message);
        return res.status(500).json({error: err.message});
    }
} 

export const getMessages = async (req, res) => {
    try{
        const {id:receiverId} = req.params;
        const senderId = req.userId;
        const conversation = await Conversation.findOne({participants:{$all:[senderId, receiverId]}})
            .populate("messages");
        if(!conversation) return res.status(200).json({empty: "Conversation is empty and has no messages"});
        const messages = conversation.messages.map(({createdAt, message, senderId, ...rest}) => ({createdAt, senderId, message}))
        return res.status(200).json(messages);
    }catch(err){
        return res.status(400).json({error: err.message});
    }
}