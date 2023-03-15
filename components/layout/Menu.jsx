import menu from '@/styles/Menu.module.scss'
import Link from 'next/link';
import { deleteCookie } from 'cookies-next';


export default function Menu({ menuOpen, setMenuOpen }) {

  const handlelogout = ()=>{
    deleteCookie('token', { maxAge: 0})
  }
    return (
      <div className={`${menu.menu}   ${menuOpen ? menu.active:''}`}>
        <ul>
          <li onClick={()=> setMenuOpen(false)}>
            <Link href="/mainpage">Home</Link>
          </li>
          <li onClick={()=> setMenuOpen(false)}>
            <Link href="/activity">Start Exercise</Link>
          </li>
          <li onClick={()=> setMenuOpen(false)}>
            <Link href="/progress">Exercise Progress</Link>
          </li>
          <li onClick={()=> setMenuOpen(false)}>
            <Link href="/signup">SignUp</Link>
          </li>
          <li onClick={()=> setMenuOpen(false)}>
            <Link href="/signin">SignIn</Link>
          </li>
          <li onClick={()=> setMenuOpen(false)}>
            <Link onClick={handlelogout} href="/signin">Sign Out</Link>
          </li>
        </ul>
      </div>
    );
  }