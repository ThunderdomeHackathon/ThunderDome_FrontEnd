import "../styles/Navbar.css";

import { Link, useNavigate } from "react-router-dom";

import ReorderIcon from "@mui/icons-material/Reorder";
import { isString } from "lodash";
import { signOut } from "../api/FirebaseApi";
import { useState } from "react";
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

  const renderContent = () => {
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

    return (
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/organization-login"> Organization Login </Link>
        <Link to="/voter-login"> Voter Login </Link>
      </div>
    );
  };

  return <div className="navbar">{renderContent()}</div>;
};

export default Navbar;
