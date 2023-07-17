import "../styles/Navbar.css";

import { Link, useNavigate } from "react-router-dom";

import ReorderIcon from "@mui/icons-material/Reorder";
import { isString } from "lodash";
import { signOut } from "../api/FirebaseApi";
import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebaseStuff/index";

export const Navbar = () => {
  const [openLinks, setOpenLinks] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const logout = async () => {
    //destinationPage === 'organization-login' || destinationPage === 'voter-login' || destinationPage === ''

    await signOut();
    navigate("/");
  };

  const RenderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (user) {
      return (
        <div className="signout-container">
          <button onClick={logout}>Sign out</button>
        </div>
      );
    }
  };

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  
  const HandleClick = () => setClick(!click);
  const CloseMobileMenu = () => setClick(false);
  
  const ShowButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  
  useEffect(() => {
    ShowButton();
  }, []);
  
  window.addEventListener('resize', ShowButton);

    return (
      <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={CloseMobileMenu}>
            ThunderDome
          </Link>
          <div className='menu-icon' onClick={HandleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={CloseMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/organization-login'
                className='nav-links'
                onClick={CloseMobileMenu}
              >
                Organization Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/voter-login'
                className='nav-links'
                onClick={CloseMobileMenu}
              >
                Voter Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      </>
    );
    return <div className="navbar">{RenderContent()}</div>;
};

export default Navbar;
