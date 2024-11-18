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

function App() {

  const { token, theme } = useContext(AuthContext)

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
      </>
      }
      <Route path="request-password/" element={<PasswordReset />} />
      <Route path="reset-password/:uidb64/:token" element={<ResetPassword />} />
      <Route path="sent-mail/" element={<EmailSent />} />
    </Routes>
  ), [token]);

  return (
    <div className={theme === 'light' ? `app-wrapper dark` : `app-wrapper light`}>
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
