// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Exercises from '../../models/Exercises'
import Users from '../../models/Users'
import connectDb from '@/middleware/mongoose'
import JWT from 'jsonwebtoken'

const JWT_SECRET = "Mehranisagudb$oy";

const handler = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization;
    const decode = JWT.verify(token, JWT_SECRET)
    // console.log(decode.user.id);

    const {method} = req;
    switch (method){
        case 'GET':
            let exercise = await Users.findById(decode.user.id).populate("exercises")
            res.status(200).json({ exercise: exercise.exercises })
            break;
            case 'DELETE':
            let activities = await Exercises.findByIdAndDelete(req.body.id)
            
            res.status(200).json(activities);
            break;
    }
}
export default connectDb(handler)