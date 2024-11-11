import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

export const FetchUser = () => {

    const { token } = useContext(AuthContext)
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUserData = async () => {
        
            try {
                const response = await fetch("http://127.0.0.1:8000/api/get_user/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Token ${token}`,
                    },
                });
        
                const data = await response.json();
                console.log(data.data);  
                setUser(data.data)
            } catch (error) {
                console.log("Error:", error);
            }
        };

        getUserData()
    }, [token])

  return {username : user}
}
