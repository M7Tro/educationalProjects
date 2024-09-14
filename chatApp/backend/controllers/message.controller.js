import Conversation from '../models/Conversation.model.js';
import Message from '../models/Message.model.js';

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
        
        res.status(200).json({createdAt: newMessage.createdAt, message: newMessage.message});
    }catch(err){
        console.log("Error during sendMessage:", err.message);
        res.status(500).json({error: err.message});
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
        res.status(200).json(messages);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}