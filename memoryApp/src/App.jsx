import {Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Login } from './pages/auth/Login'
import { AuthContext } from './utils/context/AuthContext'
import { useContext, useEffect, useMemo } from 'react'
import { HomePage } from './pages/HomePage'
import { PasswordReset } from './pages/Password-reset'
import { ResetPassword } from './pages/ResetPassword'
import { EmailSent } from './pages/Email-Sent'
import { UpLoadImage } from './pages/Upload-Image'
import { Profile } from './pages/Profile'
import { ViewMenory } from './pages/View-Menory'
import { Navbar } from './components/Navbar'
import { Tab } from './components/Tab'
import { Register } from './pages/auth/Register'
import { Chat } from './pages/Chat'
import { FetchData } from './utils/hooks/FetchData'
import { FetchProfilePic } from './utils/hooks/GetUserProfile'
// import ErrImg from './assets/err.svg'

function App() {

  const { token, setDataFetched, setIsLoadingData, setUserProfile } = useContext(AuthContext)

  const {data, isLoading} = FetchData()
  const { pic } = FetchProfilePic()

  useEffect(() => {
      setDataFetched(data)
      setIsLoadingData(isLoading)
      setUserProfile(pic)
  }, [data, isLoading, setDataFetched, setIsLoadingData, setUserProfile, pic])

  useEffect(() => {
    const handleScroll = () => {
      const navElement = document.getElementById("nav");
      if (window.scrollY > 150) {
        navElement.classList.add("comedown");
      } else {
        navElement.classList.remove("comedown");
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const routes = useMemo(() => (
    <Routes>
      {token ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="upload/" element={<UpLoadImage />} />
          <Route path="chat/" element={<Chat />} />
          <Route path="profile/" element={<Profile />} />
          <Route path="view-memory/:id/" element={<ViewMenory />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
      
      {!token && 
      <>
        <Route path="/" element={<Login />} />
        <Route path="/auth:register" element={<Register />} />
        <Route path="request-password/" element={<PasswordReset />} />
        <Route path="reset-password/:uidb64/:token" element={<ResetPassword />} />
        <Route path="sent-mail/" element={<EmailSent />} />
      </>
      }
      
    </Routes>
  ), [token]);

  return (

  //   <div className="iss">
  //   <div className='err-img'>
  //       <img src={ErrImg} alt="server error message" />
  //   </div>
  //   <div className='err-mes'>
  //     Please wer&apos;e having some server issues, please wait for some time, sorry for the incovienience
  //   </div>
  // </div>
    <div className="app-wrapper">
      {token && 
        <div className="headddd" id='nav'>
          <Navbar />
        </div>
      }

      <div className="app_content">
        {routes}
      </div>
      
      {token && 
        <div className="foot">
          <Tab />
        </div>
      }
    </div>
  )
}

export default App
