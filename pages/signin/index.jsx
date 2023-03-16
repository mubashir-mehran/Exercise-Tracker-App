"use client"
import React from 'react'
import { motion } from "framer-motion"
import LoginIcon from '@mui/icons-material/Login';
import styles from '@/styles/Signin.module.scss'
import Link from 'next/link';
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { setCookie } from 'cookies-next';
import {url} from '../../src/utils/Url'


function Signin() {
  
 const router = useRouter()
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 

 const handleSubmit = async (e) => {
   e.preventDefault();
   const data = {  email, password };
   
   let res = await fetch(`${url}/api/signin`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(data),
   });
  //  console.log(res.body())
   let response = await res.json();
   console.log('res',res);
   setEmail("");
   setPassword("");
   if(response.success){
    
    setCookie("token", response.authtoken, { maxAge: 60 * 60 * 24 * 30 });
    
   toast.success('You are successfully logged in !', {
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
       router.push(`${url}/mainpage`)
     }, 1000);
   }
   else{
     toast.error(response.error, {
       position: "top-center",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       });
   }
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
          <LoginIcon sx={{ fontSize: 40 }} />
            LOG-IN TO YOUR ACCOUNT
          </h4>

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
          {/* <span style={{display:'flex', alignItems:'center'}}>
            <p>Forget password?</p>
          </span> */}
          <p style={{display:'flex'}}>
             Forget password?</p>
          <span style={{display:'flex',justifyContent:'center', flexDirection:'column', alignItems: 'center'}}>
          <input className={styles.button1}
            
            type="submit"
            value={"SIGN IN"}
          />
          <p className={styles.login}>Dont have an account? <Link href='/signup'>Sign-up</Link> </p>
          </span>
        </form>
      </div>
    )
}

export default Signin