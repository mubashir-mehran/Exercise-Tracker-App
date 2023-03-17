import React from "react";
import { motion } from "framer-motion"
import StartIcon from '@mui/icons-material/Start';
import styles from '@/styles/Activity.module.scss'
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import {url} from '../../src/utils/Url'

function Activity() {
  const router = useRouter()
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [activity, setActivity] = useState("Running");
  const [number, setNumber] = useState();
  const [date, setDate] = useState();

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "description") {
      setDescription(e.target.value);
    } else if (e.target.name == "activity") {
      setActivity(e.target.value);
    }else if (e.target.name == "number") {
      setNumber(e.target.value);
    }else if (e.target.name == "date") {
      setDate(e.target.value);
    }
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const exercise = { name, description, activity, duration:number};
    // console.log(exercise)
    let res = await fetch("/api/startexercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    });
    let response = await res.json();
    console.log(response);

    setName("");
    setDescription("");
    setActivity("Running");
    setNumber("");
    setDate("");

    toast.success('Finished Exercise Successfully !', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      setTimeout(() => {
        router.push(`${url}/progress`)
      }, 500);

  }

  const transition = {type: 'spring', duration : 3}
  return (
    <div className={styles.main}>
       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <form
        className={styles.activity}
        onSubmit={handleSubmit}
        method="POST"
      >
         <div className={styles.wrapper1}>
            <motion.div
            initial={{left: '150px'}}
            whileInView={{left: '8px'}}
            transition ={{...transition, type: 'tween'}}
            >
            </motion.div>
            <h2>The Fit Club..!</h2>
          </div>
        <h4 className={styles.heading4}>
            <StartIcon sx={{ fontSize: 40 }}/>
            Start Your Exercise Activity</h4>
        <label className={styles.label}  for="name">Name:</label>
        <input className={styles.input}
            onChange={handleChange}
          id="name"
          name="name"
            value={name}
          type="text"
          placeholder="Enter your name"
          required
        />
        <label className={styles.label} for="description">Description:</label>
        <input className={styles.input}
            onChange={handleChange}
          id="description"
          name="description"
            value={description}
          type="text"
          placeholder="Description"
          required
        />
        <label className={styles.label} for="activity">Choose Exercise Activity:</label>
        <select className={styles.select} type="text"  name="activity" id="activity" value={activity} onChange={handleChange}>
          <option className={styles.option} value="Running">Running</option>
          <option className={styles.option} value="Bicycle">Cycling</option>
          <option className={styles.option} value="Ridding">Ridding</option>
          <option className={styles.option} value="Swimming">Swimming</option>
          <option className={styles.option} value="Walking">Walking</option>
          <option className={styles.option} value="Hiking">Hiking</option>
        </select>

        <label className={styles.label} for="number">Duration:</label>
        <input className={styles.input} type="number" id="number" name="number" value={number} placeholder="Time Duration(minutes)" required onChange={handleChange}/>

        {/* <label className={styles.label} for="date">Date:</label> */}
        <input className={styles.input} type="hidden" id="date" name="date" value={date} required />

        <input className={styles.start}
          type="submit"
          value={"Finish"}
        />
      </form>
    </div>
  );
}

export default Activity;