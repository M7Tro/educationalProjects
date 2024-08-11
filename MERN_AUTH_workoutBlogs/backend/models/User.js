const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        unique: true, 
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true, 
    }
}, {timestamps:true})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//Static login method for verifying users:
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }else{
            throw Error("Password did not match");
        }
    }else{
        throw Error("User with this email is not found")
    }
}


const User = mongoose.model("User", userSchema);
module.exports = User;