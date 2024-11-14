import { useContext, useEffect, useState } from 'react'
// import ProfileImage from '../assets/sett.svg'
import { AuthContext } from '../utils/context/AuthContext'
import { FetchProfilePic } from '../utils/hooks/GetUserProfile'
import { Notify } from '../components/Notify'
import { toast } from 'react-toastify'
import '../assets/CSS/profile.css'
import { FetchUser } from '../utils/hooks/FetchUser'

export const Profile = () => {

    const [profilePic, setProfilePic] = useState(null)
    const { token, logOut } = useContext(AuthContext)
    const { pic } = FetchProfilePic()
    const notify = (e) => toast(e)
    const { user } = FetchUser()

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            const reader = new FileReader(); 
    
            reader.onloadend = () => {
                setProfilePic(file)
            }; 

            reader.readAsDataURL(file);
        }
        
    };

    useEffect(() => {

        if(!profilePic) return;

        const setProfile = async () => {

            const formData = new FormData();
            formData.append("profile_image", profilePic);
    
            try {
                const response = await fetch("https://gordenarcher.pythonanywhere.com/api/profile_pic/", {
                    method:"POST",
                    headers:{
                        "Authorization":`Token ${token}`
                    },
                    body: formData
                })
    
                if(response.ok){
                    const data = await response.json()
                    console.log(data)
                    notify(data.message)
                }
                else{
                    const errorData = await response.json()
                    console.log(errorData)
                    notify(errorData.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
        setProfile()
    }, [token, profilePic])

  return (
    <div className="profile_">
        <div className="profile-container">
            <div className="profile_wrap">
                {/* <div className="profile_left">
                    <div className="left_image">
                        <div className="image_wrap">
                            <img src={ProfileImage} alt="image" />
                        </div>
                    </div>
                </div> */}

                <div className="profile_right">
                    <div className="profile_main">
                        <div className="profile_right_wrapper">
                            <div className="profile_head">
                                <div className="head">
                                    <h1>Profile</h1>
                                </div>
                            </div>

                            <div className="profile_img">
                                <div className="profile-pic">
                                    <img src={`https://gordenarcher.pythonanywhere.com/${pic.profile_image}`} alt="image" />
                                </div>
                                        
                                <div className="upload_pro">
                                    <div className="dd">
                                        <input
                                        type='file'
                                        name="profile_image"
                                        id='profilepic'
                                        alt="profile image" 
                                        onChange={handleImageUpload}
                                        hidden
                                        />

                                        <label htmlFor="profilepic">
                                                <i className='bi bi-image'></i>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="profile_list">
                                <div className="profile_list_item">
                                    <ul>
                                        <li>
                                            <div className="col">
                                                <div className="col">
                                                    <div className="icon">
                                                        <i className="bi bi-person-fill"></i>
                                                    </div>
                                                    <div className="name">
                                                        <p>{user.username}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="col">
                                                <div className="col">
                                                    <div className="icon">
                                                        <i className="bi bi-envelope-fill"></i>
                                                    </div>
                                                    <div className="name">
                                                        <p>{user.email ? user.email : "-"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="col">
                                                <div className="col">
                                                    <div className="icon">
                                                        <i className="bi bi-moon-stars"></i>
                                                    </div>
                                                    <div className="name">
                                                        <p>Dark Mode</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li style={{color:'red'}} className='out' onClick={logOut}>
                                            <div className="col">
                                                <div className="icon">
                                                    <i className="bi bi-box-arrow-left"></i>
                                                </div>
                                                <div className="name">
                                                    <p>Logout</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Notify />
    </div>
  )
}
