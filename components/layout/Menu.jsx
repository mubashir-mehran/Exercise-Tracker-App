import menu from '@/styles/Menu.module.scss'
import Link from 'next/link';
import { deleteCookie } from 'cookies-next';
import {url} from '../../src/utils/Url'

export default function Menu({ menuOpen, setMenuOpen }) {

  const handlelogout = ()=>{
    deleteCookie('token', { maxAge: 0})
    window.location.replace("/signin")
  }
    return (
      <div className={`${menu.menu}   ${menuOpen ? menu.active:''}`}>
        <ul>
          <li onClick={()=> setMenuOpen(false)}>
            <Link href={`${url}/mainpage`}>Home</Link>
          </li>
          <li onClick={()=> setMenuOpen(false)}>
            <Link href={`${url}/activity`}>Start Exercise</Link>
          </li>
          <li onClick={()=> setMenuOpen(false)}>
            <Link href={`${url}/progress`}>Exercise Progress</Link>
          </li>
          {/* <li onClick={()=> setMenuOpen(false)}>
            <Link href="/signup">SignUp</Link>
          </li>
          <li onClick={()=> setMenuOpen(false)}>
            <Link href="/signin">SignIn</Link>
          </li> */}
          <li onClick={()=> setMenuOpen(false)}>
            <a onClick={handlelogout}>Sign Out</a>
          </li>
        </ul>
      </div>
    );
  }