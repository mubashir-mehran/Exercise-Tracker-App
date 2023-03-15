import React from 'react'
import { motion } from "framer-motion"
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import styles from '@/styles/Signup.module.scss'
import Link from 'next/link';
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

function Signup() {
  const router = useRouter()
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    let res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);
    setName("");
    setEmail("");
    setPassword("");
    toast.success('Your Account has been created !', {
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
        router.push('http://localhost:3000/signin')
      }, 1000);
  };

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };
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
     
      <form className={styles.form}
        onSubmit={handleSubmit}
        method="POST"
      >
         <div className={styles.wrapper}>
          <motion.div
          initial={{left: '150px'}}
          whileInView={{left: '8px'}}
          transition ={{...transition, type: 'tween'}}
          >
          </motion.div>
          <h2>The Fit Club..!</h2>
        </div>
        
        <h4 className={styles.heading}>
        <PersonAddAltSharpIcon sx={{ fontSize: 40 }} />
          SIGN UP
        </h4>
        
        <input className={styles.inputs}

          onChange={handleChange}

          id="name"
          name="name"
          type="text"
          value={name}
          placeholder="Enter your name"
          required
        />
        <input className={styles.inputs}
         
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          value={email}
          placeholder="Enter your email"
          autoComplete="email"
          required
        />
        <input className={styles.inputs}
        
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          value={password}
          autoComplete="current-password"
          placeholder="Enter your password"
          required
        />
        <span style={{display:'flex',justifyContent:'center', flexDirection:'column', alignItems: 'center'}}>
        <input className={styles.button}
  
          type="submit"
          value={"CREATE ACCOUNT"}
        />
        <p className={styles.login}>Already have an account? <Link href='/signin'> Sign-in </Link></p>
        </span>
      </form>
    </div>
  )
}

export default Signup