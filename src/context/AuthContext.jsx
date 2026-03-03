import React, { createContext, useEffect, useState } from 'react'


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isAuth") === "true"
    });

    useEffect(() => {
        localStorage.setItem("isAuth", isLoggedIn.toString())
    }, [isLoggedIn])

    const login = () => {
        setIsLoggedIn(true)
    }
    const logout = () => {
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
