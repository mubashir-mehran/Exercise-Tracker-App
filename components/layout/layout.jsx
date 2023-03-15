
import Topbar from "./Topbar";
import Menu from "./Menu";
import { useState } from "react";

function Layout({children}) {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>

      <div>
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div>
            {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
