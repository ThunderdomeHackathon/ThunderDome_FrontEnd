import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/Navbar.css';

// Firebase imports
import { signOut } from "../api/FirebaseApi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebaseStuff/index";

function Navbar() {
    // Variable and function definitions
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

    // example of using state
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(false);
        } else {
          setButton(true);
        }
      };
    
      // used to keep button from showing on refresh
      useEffect(() => { showButton(); }, []);

      const renderContent = () => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (user) {
          return (
            <nav className='navbar'>
              <div className='navbar-container'>
                <div className="signout-container">
                  <button onClick={logout}>Sign out</button>
                </div>
              </div>
            </nav>
          );
        }
    
      window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          ThunderDome
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/organization-login'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Organization Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/voter-login'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Voter Login
              </Link>
            </li>

            <li>
              <Link
                to='/about-us'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                About Our Project
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
  return <>{renderContent()}</>;
}

export default Navbar