import { useContext, useState } from 'react'
import { Loader } from '../../components/Loader'
import { Link } from 'react-router-dom'
import LoginImage from '../../assets/login.svg'
import {  toast } from 'react-toastify';
import { AuthContext } from '../../utils/context/AuthContext';
import { Notify } from '../../components/Notify';

export const Login = () => {

    const { saveToken, theme } = useContext(AuthContext)
    const [viewPassword, setViewPassword] = useState(false)
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState({
        username: "",
        password: ""
      })
      
      const notify = (e) => toast(e)
    
      const loginUser = async (e) => {
        e.preventDefault()

        if(!data.username || !data.password){
            return notify("All fields are required")
        }
    
        try {

            setLoader(true)
    
          const response = await fetch("https://gordenarcher.pythonanywhere.com/api/login/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                username : data.username,
                password : data.password
            })
          })
          
          if(response.ok){
            setLoader(false)
            const data = await response.json()
            notify(data.success)
            setData("")
            setTimeout(() => {
                saveToken(data.token)
            },2000)
            
          }else{
            setLoader(false)
            const errorData = await response.json()
            notify(errorData.error)
            console.log(errorData.error)
          }
    
        } catch (error) {
          console.log(error)
        }finally{
            setLoader(false)
        }
      }

      document.addEventListener('keypress', (e) => {
        if (e.key === "Enter"){
            loginUser()
        }
    })

    const dark = {
        background: "black",
        color : "white"
    }

    const b = {
        border :"1px solid #ccc",
        color : "#fff"
    }

  return (

    <div className='auth'  style={theme === "light" ? dark : null}>
        <div className="login">
            <div className="login_wrapper">
                <div className="login_left">
                    <div className="left_wrap">

                        <div className="message"  style={theme === "light" ? dark : null}>
                            <span>Welcome, love! 💖 <br /> I&apos;m so glad to have you here. Log in and let&apos;s keep creating memories together. Every moment here is just for us—enjoy it!</span>
                        </div>

                        <div className="left_image">
                            <img src={LoginImage} alt="login image" />
                        </div>

                        
                    </div>
                </div>
                <div className="line"></div>
                <div className="login_right">
                    <div className="auth_wrapper">
                        <div className="auth_head"  style={theme === "light" ? dark : null}>
                            <h4>Login Baby Girl!</h4>
                        </div>

                        <div className="login_auth">
                            <form className="authent" onSubmit={loginUser}>
                                <div className="form_">
                                   <div className="form_input">
                                        <label htmlFor="username"  style={theme === "light" ? dark : null}>Username</label>

                                        <input 
                                        style={theme === "light" ? b : null}
                                        type="text" 
                                        name='username' 
                                        id='username'
                                        value={data.username} 
                                        onChange={(e) => {
                                                setData((currentData) => ({
                                                    ...currentData, 
                                                    username: e.target.value
                                                }))
                                            }} />
                                        <button>
                                            <i className="bi bi-person-fill"></i>
                                        </button>
                                   </div>

                                   <div className="form_input">
                                        <label htmlFor="password" style={theme === "light" ? dark : null}>Password</label>
                                        <input 
                                          style={theme === "light" ? b : null}
                                        type={viewPassword ? 'text' : 'password'} 
                                        name='password' 
                                        id='password'
                                        onChange={(e) => {
                                            setData((currentData) => ({
                                                ...currentData,
                                                password: e.target.value
                                                }))
                                        }} />
                                        <button>
                                        <i className="bi bi-key-fill"></i>
                                        </button>
                                   </div>

                                   <div className='v'>
                                        <div className="view_password">
                                            <div className="slide">
                                                <input type="checkbox" name="viewPassword" id="view" hidden />
                                                <label onClick={() => {
                                                    setViewPassword(!viewPassword)
                                                }} htmlFor="view"></label>
                                            </div>

                                            <div className="s-text">
                                                <p>Show Password</p>
                                            </div>
                                        </div>

                                        <div className="fpass">
                                            <span>Forgotten password? <Link to='/request-password'>Reset </Link> </span>
                                        </div>
                                   </div>

                                    <div className="submit">
                                        <button>{loader ? <Loader /> : "Login"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div>
                                    <span>Already have an account ? <Link to={"/auth:register"}>Register</Link> </span>
                                </div>
                    </div>
                </div>
            </div>
        </div>

        <Notify />
    </div>
  )
}

