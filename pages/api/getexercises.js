// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Exercises from '../../models/Exercises'
import connectDb from '@/middleware/mongoose'



const handler = async (req, res) => {
    let exercise = await Exercises.find().populate("Exercises");
    res.status(200).json({ exercise })
}
export default connectDb(handler)