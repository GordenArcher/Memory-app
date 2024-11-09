import { useContext } from "react"
import { AuthContext } from "../utils/context/AuthContext"
import { useNavigate } from "react-router-dom"

export const HomePage = () => {
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    const logOutUser = () => {
        logOut()
        navigate("/")
    }
  return (
    <div>HomePage
        <button onClick={logOutUser}>LOGOUT</button>
    </div>
  )
}
