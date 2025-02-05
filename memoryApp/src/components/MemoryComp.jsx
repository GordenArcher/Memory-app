import { useContext } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/context/AuthContext";

export const MemoryComp = ({ d }) => {
    const dateCreated = d.date_created;
    const date = new Date(dateCreated);
    const newDate = date.toDateString();
    const { play, pause, controls, videoRefs, endVideo } = useContext(AuthContext)

    const navigate = useNavigate();

    const navigateView = () => {
        navigate(`view-memory/${d.id}/`, { state: { memoryData: d } });
    };

    return (
        <div className="memory-container" aria-label="View memory details">
            <div className="mem-wrapper">
                <div className="memory_image">
                {d.media && (
                        d.media.match(/\.(mp4|mov|avi|mkv)$/i) ? (
                                <>
                                    <div onClick={navigateView}>
                                        <video 
                                        
                                        controls={false} 
                                        ref={(el) => (videoRefs.current[d.id] = el)} 
                                        src={`https://gordenarcher.pythonanywhere.com/${d.media}`} 
                                        onEnded={() => endVideo(d.id)}
                                        />
                                    </div>

                                    <div className="controls">
                                        <button 
                                        onClick={() => (controls[d.id] ? pause(d.id) : play(d.id))} 
                                        aria-label={controls[d.id] ? "Pause video" : "Play video"}
                                        >
                                            <i className={`bi ${controls[d.id] ? "bi-pause" : "bi-play"}`}></i>
                                        </button>
                                    </div>
                                </>
                        ) : (
                            <div onClick={navigateView}>
                                <img src={`https://gordenarcher.pythonanywhere.com${d.media}`} alt="memory" width="300" />
                            </div>
                        )
                    )}
                </div>
                
                {d.description && (
                    <div className="memory-description">
                        <div className="memo-about">
                            <h3>{d.description}</h3>
                        </div>
                    </div>
                )}

                <div className="memory-date">
                    <div className="date">
                        <span>Uploaded on </span>
                        
                        <p>{newDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


MemoryComp.propTypes = {
    d: PropTypes.shape({
        date_created: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        media: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
};