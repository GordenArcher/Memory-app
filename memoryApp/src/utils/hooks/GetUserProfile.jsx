import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export const FetchProfilePic = () => {

    const { token } = useContext(AuthContext)
    const [dataFetched, setDataFetched] = useState({})

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await fetch("https://gordenarcher.pythonanywhere.com/api/get_profile_pic/", {
                    method:'GET',
                    headers : {
                        "Content-Type":"application/json",
                        "Authorization" : `Token ${token}`
                    }
                })
        
                if(response.ok){
                    const data = await response.json()
                    setDataFetched(data.data)
                }else{
                    const errorData = await response.json()
                    console.log(errorData)
                }
    
    
            } catch (error) {
                console.log(error)
            }
        }

        getUserProfile()
    }, [token])

  return {pic : dataFetched}

}