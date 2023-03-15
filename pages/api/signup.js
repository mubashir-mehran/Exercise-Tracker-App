// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Users from '@/models/Users'
import connectDb from '@/middleware/mongoose'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


const JWT_SECRET = "Mehranisagudb$oy";

const handler = async (req, res) => {

  let success = false;

  //if there are errors, return Bad request and the errors

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
  }

  // check whether the user exists already
  
  try {
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
          return res.status(400).json({success, error: " Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Create a new user
      user = await Users.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
      });
      const data = {
          user: {
              id: user.id
          }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json({user})
      success= true;
      res.json({success, authtoken })

  } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
  }
}
export default connectDb(handler);