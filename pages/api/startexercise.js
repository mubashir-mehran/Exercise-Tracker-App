// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Users from '../../models/Users'
import  Exercise from '../../models/Exercises'
import connectDb from '@/middleware/mongoose'
import './signin'
import {verify} from 'jsonwebtoken'

const JWT_SECRET = "Mehranisagudb$oy";

const handler = async (req, res) => {
    const token = req.cookies.token;
    console.log('token found',token);
    const decode = verify(token, JWT_SECRET)
    console.log("dsd");
    console.log(decode);
    // const a = data.user.id;
    // console.log(a)

    if (req.method == 'POST') {
        console.log("Hello")
      try{
        let e = new Exercise({
            name: req.body.name,
            description:req.body.description,
            activity:req.body.activity,
            duration:req.body.duration,
            date:req.body.date,
        })
        
       const exerciseCreated =  await e.save()
       console.log(exerciseCreated)
       const userUpdated = await Users.findByIdAndUpdate({_id:decode.user.id},  { $push: { exercises: exerciseCreated._id }},{ runValidators: false})
        // await Users.findById(decode.user.id)
       console.log(userUpdated)
        res.status(200).json({ success: "Success" })
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
}
    else{
        res.status(400).json({ error: "This method is not allowed" })
    }
 }

export default connectDb(handler);