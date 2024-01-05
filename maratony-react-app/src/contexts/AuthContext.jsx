import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext();

export const useAuth = () =>
{
    return useContext(AuthContext);
}

export const AuthProvider = (props) => 
{
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        if(localStorage.hasOwnProperty("token") && localStorage.hasOwnProperty("user"))
        {
            setIsLogged(true)
        }
    }, [])

    const value = 
    {
        isLogged,
        setIsLogged,
    }
    
    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}
