import React, { useState } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import "./Navbar.css"
import { isAuth, signOut } from "../Helpers/Helpers";

const Navbar = () => {
 const location = useLocation().pathname.slice(1);
 const [hovered,setHovered] = useState('')
 const navigate = useNavigate()


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
            {!isAuth()?<>
              <a className={location ==='signin' || hovered === 'signin'?"text-primary fw-bold nav-link":"fw-bold nav-link"} onMouseEnter={()=>setHovered('signin')} onMouseOut={()=>setHovered('')} href="/signin">
              Signin
            </a>
            <a className={location==='signup' || hovered === 'signup'?"text-primary fw-bold nav-link":"fw-bold nav-link"} onMouseEnter={()=>setHovered('signup')} onMouseOut={()=>setHovered('')} href="/signup">
              Signup
            </a></>:<>
            <div className="d-flex align-items-center">
              {isAuth().role==='subscriber'&&<Link className="fw-bold my-0 fs-4 me-3 text-decoration-none text-dark" to="/private">{isAuth().name}</Link>}
              {isAuth().role==='admin'&&<Link className="fw-bold my-0 fs-4 me-3 text-decoration-none text-dark" to="/admin">{isAuth().name}</Link>}
            </div>
            <a className={location ==='signout' || hovered === 'signout'?"text-primary fw-semibold nav-link":"fw-semibold nav-link "} onMouseEnter={()=>setHovered('signout')} onMouseOut={()=>setHovered('')} onClick={()=>signOut(()=>{
              navigate('/')
            })} >
              Signout
            </a>
          </>}
 
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
