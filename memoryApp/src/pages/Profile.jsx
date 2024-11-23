import { useContext, useEffect, useState, useMemo } from 'react';
import ProfileImage from '../assets/avatar-4.png';
import { AuthContext } from '../utils/context/AuthContext';
import { FetchProfilePic } from '../utils/hooks/GetUserProfile';
import { Notify } from '../components/Notify';
import { toast } from 'react-toastify';
import '../assets/CSS/profile.css';
import { FetchUser } from '../utils/hooks/FetchUser';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {

    const [profilePic, setProfilePic] = useState(null);
    const { token, logOut, theme, setPageTheme } = useContext(AuthContext);
    const { pic } = FetchProfilePic();
    const notify = (e) => toast(e);
    const { user } = FetchUser();
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            const reader = new FileReader(); 
    
            reader.onloadend = () => {
                setProfilePic(file);
            }; 

            reader.readAsDataURL(file);
        }
    };

    const logOutUser = () => {
        logOut();
        navigate("/");
    };

    useEffect(() => {

        if(!profilePic) return;

        const setProfile = async () => {
            const formData = new FormData();
            formData.append("profile_image", profilePic);

            try {
                const response = await fetch("https://gordenarcher.pythonanywhere.com/api/v1/profile_pic/", {
                    method:"POST",
                    headers:{
                        "Authorization":`Token ${token}`
                    },
                    body: formData
                });

                if(response.ok){
                    const data = await response.json();
                    console.log(data);
                    notify(data.message);
                }
                else{
                    const errorData = await response.json();
                    console.log(errorData);
                    notify(errorData.message);
                }
            } catch (error) {
                console.log(error);
            }
        };

        setProfile();

    }, [token, profilePic]);

    const dark = useMemo(() => ({
        background: "black",
        color: "white"
    }), []);

    const b = useMemo(() => ({
        border: "1px solid #ccc"
    }), []);

    const profileImageUrl = useMemo(() => {
        return pic.profile_image 
            ? `https://gordenarcher.pythonanywhere.com/${pic.profile_image}` 
            : ProfileImage;
    }, [pic.profile_image]);

    return (
        <div className="profile_" style={theme === "light" ? dark : null}>
            <div className="profile-container">
                <div className="profile_wrap">
                    <div className="profile_right" style={theme === "light" ? b : null}>
                        <div className="profile_main">
                            <div className="profile_right_wrapper">
                                <div className="profile_head">
                                    <div className="head">
                                        <h1>Profile</h1>
                                    </div>
                                </div>

                                <div className="profile_img">
                                    <div className="profile-pic">
                                        <img src={profileImageUrl} alt="profile" />
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
                                                <div className="col" style={theme === "light" ? dark : null}>
                                                    <div className="icon">
                                                        <i className="bi bi-person-fill"></i>
                                                    </div>
                                                    <div className="name">
                                                        <p>{user.username}</p>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="col" style={theme === "light" ? dark : null}>
                                                    <div className="icon">
                                                        <i className="bi bi-envelope-fill"></i>
                                                    </div>
                                                    <div className="name">
                                                        <p>{user.email ? user.email : "-"}</p>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="col" style={theme === "light" ? dark : null}>
                                                    <div className="name tt">
                                                        {theme === "light" ? (
                                                            <>
                                                                <i className={`bi bi-sun-fill`}></i>
                                                                <p>Light Mode</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className={`bi bi-moon-stars`}></i>
                                                                <p>Dark Mode</p>
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="slide">
                                                        <input type="checkbox" checked={theme === "light"} name="viewPassword" id="view" hidden />
                                                        <label htmlFor="view" onClick={() => setPageTheme(current => !current)}></label>
                                                    </div>
                                                </div>
                                            </li>

                                            <li style={{color:'red'}} className='out' onClick={logOutUser}>
                                                <div className="icon">
                                                    <i className="bi bi-box-arrow-left"></i>
                                                </div>
                                                <div className="name">
                                                    <p>Logout</p>
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
    );
}
