import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

export const FetchUser = () => {

    const { token } = useContext(AuthContext)
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUserData = async () => {
        
            try {
                const response = await fetch("https://gordenarcher.pythonanywhere.com/api/v1/get_user/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Token ${token}`,
                    },
                });
        
                const data = await response.json();
                setUser(data.data)
            } catch (error) {
                console.log("Error:", error);
            }
        };

        getUserData()
    }, [token])

  return {user : user}
}