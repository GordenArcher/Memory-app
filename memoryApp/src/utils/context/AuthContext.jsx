import PropTypes from "prop-types"
import { createContext, useEffect, useRef, useState } from "react"

export const AuthContext = createContext()

export const AuthContextprovider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [controls, setControls] = useState({})
    const [dataFetched, setDataFetched] = useState([])
    const [userProfile, setUserProfile] = useState({})
    const [isLoadingData, setIsLoadingData] = useState(false)
    const videoRefs = useRef({})

    console.log(dataFetched)

    useEffect(() => {
        return () => {
            videoRefs.current = {};
        };
    }, []);

    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        if(savedToken){
            setToken(savedToken)
        }
    }, [])

    const saveToken = (usertoken) => {
        localStorage.setItem("token", usertoken)
        setToken(usertoken)
    }

    const logOut = (usertoken) => {
        localStorage.removeItem("token")
        setToken(usertoken)
    }

    const play = (id) => {
        Object.keys(videoRefs.current).forEach((key) => {
            if (key !== id && videoRefs.current[key]) {
                videoRefs.current[key].pause();
                setControls((prev) => ({ ...prev, [key]: false }));
            }
        });
    
        videoRefs.current[id]?.play();
        setControls((prev) => ({ ...prev, [id]: true })); 
    };

    const pause = (id) => {
        videoRefs.current[id]?.pause();
        setControls((prev) => ({ ...prev, [id]: false }));
    };

    const endVideo = (id) => {
        setControls((prev) => ({ ...prev, [id]: false }));
    }

  return (
    <AuthContext.Provider value={{
    token, 
    saveToken, 
    setToken, 
    logOut, 
    play, 
    pause, 
    controls, 
    videoRefs, 
    endVideo,
    dataFetched,
    setDataFetched,
    isLoadingData,
    setIsLoadingData,
    userProfile,
    setUserProfile
    }}>
        {children}
    </AuthContext.Provider>
  )
}

AuthContextprovider.propTypes = {
    children: PropTypes.node
}