import React, { useState } from "react";
import { useLocation} from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
 const location = useLocation().pathname.slice(1);
 const [hovered,setHovered] = useState('')
console.log(location)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="fs-4 navbar-brand" href="/">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
          <a className={location ==='signin' || hovered === 'signin'?"text-primary fw-bold nav-link":"fw-bold nav-link"} onMouseEnter={()=>setHovered('signin')} onMouseOut={()=>setHovered('')} href="/signin">
              Signin
            </a>
            <a className={location==='signup' || hovered === 'signup'?"text-primary fw-bold nav-link":"fw-bold nav-link"} onMouseEnter={()=>setHovered('signup')} onMouseOut={()=>setHovered('')} href="/signup">
              Signup
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
