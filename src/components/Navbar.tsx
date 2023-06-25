import {Link} from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import {useState} from "react";
import '../styles/Navbar.css';


function Navbar(){

    const [openLinks, setOpenLinks] = useState(false)

    const toggleNavbar = () => {
        setOpenLinks(!openLinks)
    }

    return (
        <div className="navbar">
            <div className="leftSide" id={openLinks ? "open" : "close"}>
                <div className="hiddenLinks">
                    <Link to="/"> Home </Link>
                    <Link to="/org-login"> Organisation Login </Link>
                    <Link to='/voter-login'> Voter Login </Link>
                </div>
            </div>
            <div className="rightSide">
                <Link to="/"> Home </Link>
                <Link to="/org-login"> Organisation Login </Link>
                <Link to='/voter-login'> Voter Login </Link>
                <button onClick={toggleNavbar}>
                    <ReorderIcon />
                </button>
            </div>
        </div>
    )
}

export default Navbar