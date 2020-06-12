import React from 'react';
import { Link } from 'react-router-dom';


const Consumer = () => {
    return (
        <div>
            <Link to='/signup'>Signup</Link>
            <Link to='/login'>Login</Link>
            <h1>This is the consumer page</h1>
        </div>
    )
}





export default Consumer;