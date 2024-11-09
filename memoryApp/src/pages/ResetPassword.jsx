import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../utils/context/AuthContext"

export const ResetPassword = () => {

    const [password, setPassword] = useState("")

    const { uidb64, token } = useParams()
    const { saveToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const resetPassword = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/reset_password/${uidb64}/${token}/`, {
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({password : password})
            })

            if(response.ok){
                const data = await response.json()
                console.log(data)
                saveToken(data.token)
                navigate("/")
                
            }else{
                const errorData = await response.json()
                console.log(errorData)
            }


        } catch (error) {
            console.log(error)
        }
    }

  return (
    <form onSubmit={resetPassword}>
        <input type="password" name="password" value={password}
        onChange={(e) => {
            setPassword(e.target.value)
        }}
         />

         <br /> <br /> 

         <button>Reset</button>
    </form>
  )
}
