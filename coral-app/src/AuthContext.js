import React, { useState, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = (props) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') || false;
    const [authstatus, setAuthstatus] = useState(isLoggedIn);

    return (
        <AuthContext.Provider value={[authstatus, setAuthstatus]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider }