import '../styles/Navbar.css';

import { Link, useNavigate } from 'react-router-dom';

import ReorderIcon from '@mui/icons-material/Reorder';
import { isString } from 'lodash';
import { signOut } from '../apis/FirebaseApis';
import { useState } from 'react';

export const Navbar = () => {
    const [openLinks, setOpenLinks] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    };
    
    const getHandleLogout = (destinationPage: string) => {
        //destinationPage === 'organization-login' || destinationPage === 'voter-login' || destinationPage === ''
        return async () => {
            await signOut();
            if (isString(error)) {
                console.log(error);
                navigate('/');
                return;
            }
            navigate(`/${destinationPage}`);
            return;
        }
    }

    return (
        <div className='navbar'>
            <div className='leftSide' id={openLinks ? 'open' : 'close'}>
                <div className='hiddenLinks'>
                    <Link to='/' onClick={getHandleLogout('')}> Home </Link>
                    <Link to='/organization-login' onClick={getHandleLogout('organization-login')}> Organization Login </Link>
                    <Link to='/voter-login' onClick={getHandleLogout('voter-login')}> Voter Login </Link>
                </div>
            </div>
            <div className='rightSide'>
                <Link to='/' onClick={getHandleLogout('')}> Home </Link>
                <Link to='/organization-login' onClick={getHandleLogout('organization-login')}> Organization Login </Link>
                <Link to='/voter-login' onClick={getHandleLogout('voter-login')}> Voter Login </Link>
                <button onClick={toggleNavbar}>
                    <ReorderIcon />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
