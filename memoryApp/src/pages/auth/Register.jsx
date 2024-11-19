import { useContext, useState } from 'react'
import { Loader } from '../../components/Loader'
import { Link } from 'react-router-dom'
import LoginImage from '../../assets/login.svg'
import {  toast } from 'react-toastify';
import { AuthContext } from '../../utils/context/AuthContext';
import { Notify } from '../../components/Notify';

export const Register = () => {

    const { saveToken, theme } = useContext(AuthContext)
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
      })
      
      const notify = (e) => toast(e)
    
      const registerUser = async (e) => {
        e.preventDefault()

        if(!data.username || !data.email || !data.password){
            return notify("All fields are required")
        }

        if(data.password !== data.password2){
            return notify("Password does not")
        }
    
        try {

            setLoader(true)
    
          const response = await fetch("https://gordenarcher.pythonanywhere.com/api/register/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                username : data.username,
                email: data.email,
                password: data.password,
                password2: data.password2
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
            registerUser()
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

                        <div className="message" style={theme === "light" ? dark : null}>
                        <span>Welcome, love! 💖 <br /> I&apos;m thrilled you&apos;re joining us. Let&apos;s start creating beautiful memories together. Sign up now, and let this be the beginning of something special just for us!</span>
                        </div>

                        <div className="left_image">
                            <img src={LoginImage} alt="login image" />
                        </div>

                        
                    </div>
                </div>
                <div className="line"></div>
                <div className="login_right">
                    <div className="auth_wrapper">
                        <div className="auth_head" style={theme === "light" ? dark : null}>
                            <h4>Register Baby Girl!</h4>
                        </div>

                        <div className="login_auth">
                            <form className="authent" onSubmit={registerUser}>
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
                                        <label htmlFor="password" style={theme === "light" ? dark : null}>Email</label>
                                        <input 
                                        style={theme === "light" ? b : null}
                                        type='email'
                                        name='email' 
                                        id='email'
                                        onChange={(e) => {
                                            setData((currentData) => ({
                                                ...currentData,
                                                email: e.target.value
                                                }))
                                        }} />
                                        <button>
                                        <i className="bi bi-envelope-fill"></i>
                                        </button>
                                   </div>

                                   <div className="form_input">
                                        <label htmlFor="password"  style={theme === "light" ? dark : null}>Password</label>
                                        <input 
                                        style={theme === "light" ? b : null}
                                        type={'password'} 
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

                                   <div className="form_input">
                                        <label htmlFor="password"  style={theme === "light" ? dark : null}>Confirm Password</label>
                                        <input 
                                        style={theme === "light" ? b : null}
                                        type={'password'} 
                                        name='password2' 
                                        id='password2'
                                        onChange={(e) => {
                                            setData((currentData) => ({
                                                ...currentData,
                                                password2: e.target.value
                                                }))
                                        }} />
                                        <button>
                                        <i className="bi bi-key-fill"></i>
                                        </button>
                                   </div>

                                    <div className="submit">
                                        <button>{loader ? <Loader /> : "Register"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div>
                            <span>
                            Already have an account ? <Link to={"/"}>Login</Link>  </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Notify />
    </div>
  )
}

