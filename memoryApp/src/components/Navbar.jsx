import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../utils/context/AuthContext"
import '../assets/CSS/home.css'
import { FetchUser } from "../utils/hooks/FetchUser"
import Avatar from '../assets/avatar-4.png'
import { FetchProfilePic } from "../utils/hooks/GetUserProfile"

export const Navbar = () => {

    const [showChildProfile, setShowChildProfile] = useState(false)
    const { logOut } = useContext(AuthContext)
    const { user } = FetchUser()
    const { pic } = FetchProfilePic()

    const navigate = useNavigate()

    const logOutUser = () => {
        logOut()
        navigate("/")
    }

  return (
    <div className="nav">
        <div className="navbar">
            <div className="logo">
                <Link to={"/"}>
                    <h1 className="logo-memory">
                        <span className="logo-icon">🧠</span> Memory
                    </h1>
                </Link>
                {/* <img src="" alt="logo" /> */}
            </div>

            <div className="nav-links">
                <div className="links">
                    <ul>
                        <li>
                            <Link to={"/"}>
                                <div className="icon">
                                    <i className="bi bi-house"></i>
                                </div>
                                <div className="name">
                                    <p>Home</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/upload"}>
                                <div className="icon">
                                    <i className="bi bi-cloud-upload"></i>
                                </div>
                                <div className="name">
                                    <p>Upload Memorey</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="profile">
                <div className="set-profile">
                    <div className="profile_image" onClick={() => setShowChildProfile((currentState) => !currentState)}>
                        <img src={pic == null ? Avatar : `https://gordenarcher.pythonanywhere.com/${pic.profile_image}` } alt="" />
                    </div>
                </div>
                
                {
                    showChildProfile 
                && 
                    <div className="set-profile-children">
                        <div className="childern_">
                            <ul>
                                <li>
                                    <div className="s">
                                        <div className="p_icon">
                                            <i className="bi bi-person"></i>
                                        </div>
                                        <div className="name">{user.username}</div>
                                    </div>
                                </li>
                                <li>
                                    <Link to={"/profile"}>
                                        <div className="p_icon">
                                            <i className="bi bi-person-check"></i>
                                        </div>
                                        <div className="name">Profile</div>
                                    </Link>
                                </li>
                                <li className="show">
                                    <Link to={"/upload"}>
                                        <div className="p_icon">
                                            <i className="bi bi-cloud-upload"></i>
                                        </div>
                                        <div className="name">Upload</div>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="s" onClick={logOutUser}>
                                        <div className="p_icon">
                                            <i className="bi bi-box-arrow-left"></i>
                                        </div>
    
                                        <div className="name">LogOut</div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}