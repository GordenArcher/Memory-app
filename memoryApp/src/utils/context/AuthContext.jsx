import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthContextprovider = ({ children }) => {
    const [token, setToken] = useState(null)

    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        if(savedToken){
            setToken(savedToken)
        }
    }, [])

    const saveToken = (usertoken) => {
        localStorage.setItem("token", usertoken)
        setToken(usertoken)
    }

    const logOut = (usertoken) => {
        localStorage.removeItem("token")
        setToken(usertoken)
    }

  return (
    <AuthContext.Provider value={{token, saveToken, setToken, logOut}}>
        {children}
    </AuthContext.Provider>
  )
}
