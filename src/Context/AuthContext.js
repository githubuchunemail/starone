import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const initialToken = JSON.parse(localStorage.getItem("token"))
    let [token, setToken] = useState(initialToken)

    useEffect(() => {
        if(token){
            return localStorage.setItem("token", JSON.stringify(token))
        }
    }, [token])

    return(
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}