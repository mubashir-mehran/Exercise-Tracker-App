import styles from '@/styles/Topbar.module.scss'
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

function Topbar({ menuOpen, setMenuOpen }) {
  const [token,setToken] = useState(null) 
  useEffect(()=>{
   setToken(getCookie('token'))

  },[])
  return (
        <div className={`${styles.topbar}  ${menuOpen ? styles.active : ''}`} >
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <a className={styles.logo}>
                The Fit Club..!
              </a>
            </div>
            <div className={styles.right}>
              <div className={styles.humburger} style={{display: !token? 'none':''}}  onClick={() => setMenuOpen(!menuOpen)}>
                <span className={styles.line1}></span>
                <span className={styles.line2}></span>
                <span className={styles.line3}></span>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Topbar
