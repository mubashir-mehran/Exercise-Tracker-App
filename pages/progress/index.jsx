import React, { useState } from "react";
import styles from '@/styles/Progess.module.scss'
import FilterListIcon from '@mui/icons-material/FilterList';
import { motion } from "framer-motion"
import mongoose from "mongoose";
import {verify} from 'jsonwebtoken'
import Users from "@/models/Users";
import axios from "axios";

const JWT_SECRET = "Mehranisagudb$oy";

export default function Progress({myactivities,token}) {
  // console.log(myactivities)
  const [activities,Setactivities] = useState(myactivities)
  const transition = {type: 'spring', duration : 4}

    const handleDelete = async(id)=>{
      const res = await axios.delete(`http://localhost:3000/api/getexercises`,{data:{id},headers:{Authorization:token}},)
      // console.log(res)
      const res1 = await axios.get(`http://localhost:3000/api/getexercises`,{headers:{Authorization:token}})
      Setactivities(res1.data.exercise)
    }
  return (
    <div>
          <div className={styles.wrapper5}>
            <motion.div
            initial={{left: '470px'}}
            whileInView={{left: '8px'}}
            transition ={{...transition, type: 'tween'}}
            >
            </motion.div>
        <h1>
            <FilterListIcon sx={{ fontSize: 40 }}/>
            Here Is Your Exercise Progress</h1>
            </div>
      <main className={styles.main}>
      {activities.map((item) => {
      return <div key={item._id} className={styles.card}>
          <h2 className={styles.h2}>{item.activity}</h2>
          <h3 className={styles.h3}>{item.name}</h3>
          <h3 className={styles.h3}>{item.description}</h3>
          <h3 className={styles.h3}>{item.duration}min</h3>
          <h3 className={styles.h3}>{item.since}</h3>
          <button className={styles.btn} onClick={()=>handleDelete(item._id)}>DELETE</button>
        </div>
        
         })}
        
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const {req,res} = context
  const token = req.cookies.token;
    const decode = verify(token, JWT_SECRET)
    // console.log(decode.user.id);

  if(!mongoose.connections[0].readyState) {
    await mongoose.connect('mongodb+srv://mehran:memon786@cluster0.sqiwtqn.mongodb.net/tracker?retryWrites=true&w=majority')
  }
    let activities = await Users.findById(decode.user.id).populate("exercises")
  return {
    props: { myactivities: JSON.parse(JSON.stringify(activities.exercises)),token}, // will be passed to the page component as props
  }
  }
