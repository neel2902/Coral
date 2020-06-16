import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';


const Dashboard = () => {
    const [authstatus, setAuthstatus] = useContext(AuthContext);
    const [role, setRole] = useState('');

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
        .then(res => {
            console.log(res.data.role);
            setRole(res.data.role);
        }
        )
        .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <h1>{role}</h1>
            <h1>Put your functions here. </h1>
            <p>{authstatus ? "you are authenticated": "false"}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}





export default Dashboard;