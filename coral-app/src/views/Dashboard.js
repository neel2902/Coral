import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';


const Dashboard = () => {
    const [authstatus, setAuthstatus] = useContext(AuthContext);


    const logout = () => {
        setAuthstatus(false);
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('token');
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        console.log(token);
        axios.get('http://localhost:5000/dashboard', {
            headers: {
              Authorization: 'Bearer ' + token
            }
        })
        .then(res => {console.log(res);}
        )
        .catch(err => console.log(err))
    }, [])
    
    return (
        <div>
            <h1>Put your functions here. </h1>
            <p>{authstatus ? "you are authenticated": "false"}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}





export default Dashboard;