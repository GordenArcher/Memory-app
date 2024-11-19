import { useState, useContext } from "react"
import { Loader } from "../components/Loader"
import resetImage from '../assets/email-reqeust.svg'
import { Notify } from "../components/Notify"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../utils/context/AuthContext"

export const PasswordReset = () => {

    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { theme } = useContext(AuthContext)

    const notify = (e) => toast(e)
    const navigate = useNavigate()


    const sendMail = async (e) => {
        e.preventDefault()

        if(!email ||!email.trim()){
            return notify("Enter your email")
        }

        try {
            setIsLoading(true)

            const response = await fetch("https://gordenarcher.pythonanywhere.com/api/send_reset_password_mail/", {
                method:'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email : email})
            })

            if(response.ok){
                setIsLoading(false)
                const data = await response.json()
                console.log(data)
                notify(data.success)    
                setEmail("")
                setTimeout(() => {
                    navigate("/sent-mail")
                }, 3000)
            }else{
                setIsLoading(false)
                const errorData = await response.json()
                console.log(errorData)
                notify(errorData.error)
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
            sendMail()
        }
    })

    const dark = {
        background: "black",
        color : "white"
    }

    const b = {
        border :"1px solid #ccc "
    }

  return (
    <div className="rp" style={theme === "light" ? dark : null}>

        <div className="em" onClick={() => navigate("/")}>
            <button>
                <i className="bi bi-arrow-left-circle-fill"></i>
            </button>
        </div>

        <div className="password_request">
            <div className="request_wrapper">
                <div className="request_left">
                    <div className="reset_left_image">
                        <img src={resetImage} alt="image" />
                    </div>
                </div>

                <div className="request_right">
                    <div className="right_wrapper">
                        <div className="right_mess" style={theme === "light" ? dark : null}>
                            <h1>Enter your email to recieve your password reset link</h1>
                        </div>
                        <form onSubmit={sendMail}>

                            <div className="request_form">
                                <div className="request_form_input">
                                    <label htmlFor="email"  style={theme === "light" ? dark : null}>Email</label>
                                    <input 
                                      style={theme === "light" ? b : null}
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    autoComplete="off"
                                    value={email} 
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} />
                                    <button>
                                        <i className="bi bi-envelope"></i>
                                    </button>
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
        
        <Notify />
    </div>
  )
}
