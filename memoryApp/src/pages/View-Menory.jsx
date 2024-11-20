import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../assets/CSS/home.css'
import { AuthContext } from '../utils/context/AuthContext';
import { useContext, useState } from 'react';
import { Loader } from '../components/Loader';
import { toast } from 'react-toastify';
import { Notify } from '../components/Notify';
import '../assets/CSS/view.css'

export const ViewMenory = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { state } = useLocation()
    const { memoryData } = state || {};
    const { id } = useParams()
    const notify = (e) => toast(e)

    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleImageClick = () => {
      setIsFullscreen(true);
    };

    const dateCreated = memoryData.date_created;
    const date = new Date(dateCreated);
    const newDate = date.toDateString()
    const navigate = useNavigate()
    const { token, play, pause, controls, videoRefs, endVideo, theme } = useContext(AuthContext)

    const deleteMemory = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const response = await fetch(`https://gordenarcher.pythonanywhere.com/api/delete_image/${id}/`, {
                method:"DELETE",
                headers:{
                    "Authorization":`Token ${token}`
                }
            })

            if(response.ok){
                const data = await response.json()
                console.log(data)
                setIsLoading(false)
                notify(data.data)
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }
            else{
                const errorData = await response.json()
                console.log(errorData)
                notify(errorData.error)
                setIsLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    const dark = {
        background: "black",
        color : "white"
    }

  return (
    <div style={theme === "light" ? dark : null}>

        <div className="back" onClick={() => navigate(-1)}>
            <button>
                <i className="bi bi-arrow-left-circle-fill"></i>
            </button>
        </div>

        <div className="main-memory">
            <div className="memory-container" >
                <div className="mem-wrapper mm">
                    <div className="memory_image mi">
                    {memoryData.media && (
                        memoryData.media.match(/\.(mp4|mov|avi|mkv)$/i) ? (
                            <>
                            <video 
                            ref={(el) => (videoRefs.current[memoryData.id] = el)} 
                            src={`https://gordenarcher.pythonanywhere.com/${memoryData.media}`} 
                            onEnded={() => endVideo(id)}
                            />

                            <div className="controls">
                                <button 
                                onClick={() => (controls[memoryData.id] ? pause(memoryData.id) : play(memoryData.id))} 
                                aria-label={controls[memoryData.id] ? "Pause video" : "Play video"}
                                >
                                    <i className={`bi ${controls[memoryData.id] ? "bi-pause" : "bi-play"}`}></i>
                                </button>
                            </div>
                        </>
                        ) : (
                            <img src={`https://gordenarcher.pythonanywhere.com/${memoryData.media}`} alt="memory" width="300" onClick={handleImageClick} />
                        )
                    )}
                        {/* <img src={`https://gordenarcher.pythonanywhere.com${memoryData.image}`} alt="memory" onClick={handleImageClick} /> */}
                    </div>
                    
                    <div className='hm'>
                        {memoryData.description && 
                            <div className="memory-descriptio">
                                <div className="memo-about" style={theme === "light" ? dark : null}>
                                    <h3>{memoryData.description}</h3>
                                </div>
                            </div>
                        }

                        <div className="memory-date">
                            <div className="date" style={theme === "light" ? dark : null}>
                                <span>You uploaded this on </span>
                                <p>{newDate}</p>
                                <span> <i className='bi bi-calendar-check'></i> </span>
                            </div>
                        </div>

                        <div className="options">
                            <div className="delete" onClick={deleteMemory}>
                                <button>{isLoading ? <Loader /> : <div>Delete <i className="bi bi-trash"></i> </div>}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isFullscreen && (
                <div className="fullscreen-overlay" onClick={() => setIsFullscreen(false)}>
                    <img src={`https://gordenarcher.pythonanywhere.com${memoryData.media}`} alt="Image" className="fullscreen-image" />
                </div>
            )}

        </div>

        <Notify />
    </div>
  )
}
