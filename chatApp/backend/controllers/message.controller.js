export const sendMessage = async (req,res) => {
    try{
        res.send("You reached sendMEssage");
    }catch(err){
        console.log("Error during sendMessage:", err.message);
        res.status(500).json({error: err.message});
    }
}