import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export const FetchData = () => {

    const { token } = useContext(AuthContext)
    const [dataFetched, setDataFetched] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getUserData = async () => {
            try {
                setIsLoading(true)

                const response = await fetch("https://gordenarcher.pythonanywhere.com/api/home_page/", {
                    method:'GET',
                    headers : {
                        "Content-Type":"application/json",
                        "Authorization" : `Token ${token}`
                    }
                })
        
                if(response.ok){
                    const data = await response.json()
                    setDataFetched(data.data)
                    setIsLoading(false)
                }else{
                    const errorData = await response.json()
                    console.log(errorData)
                    setIsLoading(false)
                }
    
    
            } catch (error) {
                console.log(error)
            }
            finally{
                setIsLoading(false)
            }
        }

        getUserData()
    }, [token])

  return { data : dataFetched, isLoading }
}
