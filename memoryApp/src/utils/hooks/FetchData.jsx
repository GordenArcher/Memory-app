import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export const FetchData = () => {

    const { token } = useContext(AuthContext)
    const [dataFetched, setDataFetched] = useState([])

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/home_page/", {
                    method:'GET',
                    headers : {
                        "Content-Type":"application/json",
                        "Authorization" : `Token ${token}`
                    }
                })
        
                if(response.ok){
                    const data = await response.json()
                    console.log(data.data)
                    console.log(data.data[0])
                    setDataFetched(data.data)
                }else{
                    const errorData = await response.json()
                    console.log(errorData)
                }
    
    
            } catch (error) {
                console.log(error)
            }
        }

        getUserData()
    }, [token])

  return { data : dataFetched }
}
