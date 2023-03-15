import mongoose from "mongoose";

const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState){
        return handler(req, res)
    }
    else if (mongoose.connect('mongodb://127.0.0.1:27017/tracker')) {
        console.log("Database connected");
        res.send()
        return handler(req, res);
    } else {
        console.log("Data base failed to connect")
    }
}
export default connectDb;