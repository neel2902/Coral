import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './AuthContext';


const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [authstatus] = useContext(AuthContext);
    return (
        <Route render={props => authstatus ? <Component {...props} /> : <Redirect to="/login" />} {...rest} />
    )
}



export default ProtectedRoute;