import React from 'react'
import {useNavigate} from "react-router-dom";

interface Props {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrgLogin: React.FC<Props> = ( {setIsAuth}) => {

    {/*Import setIsAuth history using hook*/}
    const history = useNavigate()
    
    {/*Define function to handle login*/}
    const handleLogin = () => {
        setIsAuth(true)
        history("/org-overview");
    }

  return <button onClick={ () => handleLogin()}>Login</button>;
};

export default OrgLogin