import React, { useState, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [authstatus, setAuthstatus] = useState(false);

    return (
        <AuthContext.Provider value={[authstatus, setAuthstatus]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider }