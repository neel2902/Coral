import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';


const Dashboard = () => {
    const [authstatus, setAuthstatus] = useContext(AuthContext);

    const logout = () => {
        setAuthstatus(false);
        localStorage.clear();
    }
    
    return (
        <div>
            <h1>Put your functions here. </h1>
            <p>{authstatus ? "you are authenticated": "false"}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}





export default Dashboard;