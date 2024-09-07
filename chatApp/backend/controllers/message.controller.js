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
        res.status(200).json({conversation})
    }catch(err){
        console.log("Error during sendMessage:", err.message);
        res.status(500).json({error: err.message});
    }
} 