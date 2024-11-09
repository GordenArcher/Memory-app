import { useContext, useState } from 'react'
import { Loader } from '../../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import LoginImage from '../../assets/logg.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../utils/context/AuthContext';

export const Login = () => {

    const { saveToken } = useContext(AuthContext)
    const navigate = useNavigate()
    const [viewPassword, setViewPassword] = useState(false)
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState({
        username: "",
        password: ""
      })
      const notify = (e) => toast(e);
    
      const loginUser = async (e) => {
        e.preventDefault()

        if(!data.username || !data.password){
            return notify("All fields are required")
        }
    
        try {

            setLoader(true)
    
          const response = await fetch("http://127.0.0.1:8000/api/login/", {
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
            saveToken(data.token)
            navigate("/")
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


  return (

    <div className='auth'>
        <div className="login">
            <div className="login_wrapper">
                <div className="login_left">
                    <div className="left_wrap">

                        <div className="message">
                            <span>Welcome, love! 💖 <br /> I&apos;m so glad to have you here. Log in and let&apos;s keep creating memories together. Every moment here is just for us—enjoy it!</span>
                        </div>

                        {/* <div className="left_image">
                            <img src={LoginImage} alt="login image" />
                        </div> */}

                        
                    </div>
                </div>
                <div className="login_right">
                    <div className="auth_wrapper">
                        <div className="auth_head">
                            <h4>Login Baby Girl!</h4>
                        </div>

                        <div className="login_auth">
                            <form className="authent" onSubmit={loginUser}>
                                <div className="form_">
                                   <div className="form_input">
                                        <label htmlFor="username">Username</label>

                                        <input 
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
                                        <label htmlFor="password">Password</label>
                                        <input 
                                        type="password" 
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
                                                <p style={{color:'#000'}}>Show Password</p>
                                            </div>
                                        </div>

                                        <div className="fpass">
                                            <span>You forgot your password? <Link to='/request-password'>Reset </Link> </span>
                                        </div>
                                   </div>

                                    <div className="submit">
                                        <button>{loader ? <Loader /> : "Login"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Slide
        />
    </div>
  )
}

