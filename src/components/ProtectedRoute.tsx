import React from 'react'
import {useNavigate, Route, RouteProps} from 'react-router-dom'

export type Props = RouteProps & {
    isAuth: boolean;
}

const ProtectedRoute = ({ isAuth, ...routeProps}: Props) => {
    const Redirect = useNavigate();
    if (isAuth) {
        return <Route {...routeProps}/>
    }
    
  return (
    (null)
  );
}

export default ProtectedRoute;