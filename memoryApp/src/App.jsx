import {Routes, Route } from 'react-router-dom'
import './App.css'
import { Login } from './pages/auth/Login'
import { AuthContext } from './utils/context/AuthContext'
import { useContext } from 'react'
import { HomePage } from './pages/HomePage'
import { PasswordReset } from './pages/Password-reset'
import { ResetPassword } from './pages/ResetPassword'

function App() {

  const { token } = useContext(AuthContext)

  return (
    <>
      <Routes>
        <Route path='/' element={ token? <HomePage /> : <Login />} />
        <Route path='request-password/' element={<PasswordReset /> } />
        <Route path='reset-password/:uidb64/:token' element={<ResetPassword /> } />
      </Routes>

    </>
  )
}

export default App
