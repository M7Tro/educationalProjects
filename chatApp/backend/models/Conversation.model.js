import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  
    }]
}, {timestamps: true})