import React from "react";
import styles from '@/styles/Progess.module.scss'
import FilterListIcon from '@mui/icons-material/FilterList';
import { motion } from "framer-motion"
import mongoose from "mongoose";
import {verify} from 'jsonwebtoken'
import Users from "@/models/Users";

const JWT_SECRET = "Mehranisagudb$oy";

export default function Progress({activities}) {
  console.log(activities)
    const transition = {type: 'spring', duration : 4}
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
    console.log(decode.user.id);

  if(!mongoose.connections[0].readyState) {
    await mongoose.connect('mongodb://127.0.0.1:27017/tracker')
  }
    let activities = await Users.findById(decode.user.id).populate("exercises")
  return {
    props: { activities: JSON.parse(JSON.stringify(activities.exercises)) }, // will be passed to the page component as props
  }
  }