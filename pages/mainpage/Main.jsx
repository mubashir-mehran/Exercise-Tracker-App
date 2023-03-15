// import "./intro.scss"
import {motion} from 'framer-motion'
import Image from "next/image"
import styles from '@/styles/Main.module.scss'


export default function Intro() {
  const transition = {type: 'spring', duration : 3}
  const mobile =globalThis.window?.innerWidth<=768 ? true: false;
  return (
    <div className={styles.intro} id="intro">
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src="/body.png" alt=""  width='400' height="500"/>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <motion.div
          initial={{left: mobile? "240px": "268px"}}
          whileInView={{left: '8px'}}
          transition ={{...transition, type: 'tween'}}
          >

          </motion.div>
        <h5>A Good Workout is a great way to create a good mind</h5>
        </div>
        <div className={styles.ideal}>
          <h1>Shape Your</h1>
          <h2>Ideal Body.</h2>
        </div>
      </div>
    </div>
  )
}