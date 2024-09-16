import User from '../models/User.js';

export default async function getUsersForSidebar  (req, res) {
    //The goal is to get and send the users other than the logged in user.
    const loggedInUser = req.userId;
    const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password");
    return res.status(200).json(filteredUsers);
}