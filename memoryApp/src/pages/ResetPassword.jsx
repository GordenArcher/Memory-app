import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../utils/context/AuthContext"
import { toast } from "react-toastify"
import { Notify } from "../components/Notify"
import { Loader } from "../components/Loader"
import resetImage from '../assets/reset.svg'

export const ResetPassword = () => {

    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { uidb64, token } = useParams()
    const notify = (e) => toast(e)
    const { saveToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const resetPassword = async (e) => {
        e.preventDefault()

        if(!password || !password.trim()) return notify("Password is Empty")

        if(password.length < 6){
            return notify("Password should more than 6")
        }   

        try {
            setIsLoading(true)
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
                setIsLoading(false)
                notify(data.success)
                navigate("/")
                
            }else{
                const errorData = await response.json()
                console.log(errorData)
                notify(errorData.error)
                setIsLoading(false)
            }


        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    document.addEventListener('keypress', (e) => {
        if (e.key === "Enter"){
            resetPassword()
        }
    })

  return (
    <>
        <div className="reset_password">
            <div className="reset">
                <div className="password_reset">
                    <div className="request_wrapper">
                        <div className="request_left">
                            <div className="reset_left_image">
                                <img src={resetImage} alt="image" />
                            </div>
                        </div>

                        <div className="request_right">
                            <div className="right_wrapper">
                                <div className="right_mess">
                                    <h1>Enter your new password to reset it</h1>
                                </div>
                                <form onSubmit={resetPassword}>

                                    <div className="request_form">
                                        <div className="request_form_input">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" name="email" value={password} onChange={(e) => {
                                                setPassword(e.target.value)
                                            }} />

                                            <button>
                                                <i className="bi bi-shield-lock"></i>
                                            </button>

                                            {password.length > 6 ? null : <p style={{color:'red'}}>Password should be more than 6</p>}
                                        </div>

                                        <div className="sent_request">
                                            <button>{isLoading ? <Loader /> : 'Reset'}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    <Notify />
    </>
  )
}
