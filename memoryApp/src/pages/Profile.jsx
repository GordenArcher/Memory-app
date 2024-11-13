import { useContext, useEffect, useState } from 'react'
import ProfileImage from '../assets/sett.svg'
import { AuthContext } from '../utils/context/AuthContext'
import { FetchProfilePic } from '../utils/hooks/GetUserProfile'

export const Profile = () => {

    const [profilePic, setProfilePic] = useState(null)
    const { token } = useContext(AuthContext)
    const { pic } = FetchProfilePic()
    console.log(pic)
    console.log(pic.profile_image)

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
                const response = await fetch("http://localhost:8000/api/profile_pic/", {
                    method:"POST",
                    headers:{
                        "Authorization":`Token ${token}`
                    },
                    body: formData
                })
    
                if(response.ok){
                    const data = await response.json()
                    console.log(data)
                }
                else{
                    const errorData = await response.json()
                    console.log(errorData)
                }
            } catch (error) {
                console.log(error)
            }
        }
        setProfile()
    }, [token, profilePic])

  return (
    <div className="profile">
        <div className="profile-container">
            <div className="profile_wrap">
                <div className="profile_head">
                    <div className="head">
                        <h1>Profile</h1>
                    </div>
                    <div className="image_wrap">
                        <img src={ProfileImage} alt="image" />
                    </div>
                </div>
                <div className="profile_main">
                    <div className="profile_right_wrapper">
                        <div className="profile_image">

                            <img src={`http://127.0.0.1:8000/${pic.profile_image}`} alt="image" style={{width:'200px', height:'200px'}} />
                                
                            <input
                            type='file'
                            name="profile_image"
                            id='profilepic'
                            alt="profile image" 
                            onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
