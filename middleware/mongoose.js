import mongoose from "mongoose";

const connectDb = handler => async (req, res) => {
   try {
    if (mongoose.connections[0].readyState){
        return handler(req, res)
    }
    else if (mongoose.connect('mongodb+srv://mehran:memon786@cluster0.sqiwtqn.mongodb.net/tracker?retryWrites=true&w=majority')) {
        console.log("Database connected");
        
        return handler(req, res);
    } else {
        console.log("Data base failed to connect")
    }
} catch (error) {
    console.log(error.message)   
}
}
export default connectDb;