// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Users from '@/models/Users'
import connectDb from '@/middleware/mongoose'
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
import Exercises from '@/models/Exercises'

const JWT_SECRET = "Mehranisagudb$oy";

const handler = async (req, res) => {
let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await Users.findOne({ email:email }).populate({path: 'exercises', model: Exercises});
        console.log('user found',user);
        if (!user) {
            success = false;
            res.status(400).send({ error: 'please try to login with correct credentials' });
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            success = false;
            res.status(400).send({success, error: 'please try to login with correct credentials' });
        }
        const data = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({success, authtoken, exercises: user.exercises })

    } catch (error) {
        console.error(error.message);
        res.status(500).send({err:'Internal Server Error'});
    }
}
export default connectDb(handler);