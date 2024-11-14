import { useNavigate, useParams } from "react-router-dom";

export const MemoryComp = ({ d }) => {
    const dateCreated = d.date_created;
    const date = new Date(dateCreated);
    const newDate = date.toDateString();

    const navigate = useNavigate();

    const navigateView = () => {
        navigate(`view-memory/${d.id}/`, { state: { memoryData: d } });
    };

    console.log(d);

    return (
        <div className="memory-container" onClick={navigateView} aria-label="View memory details">
            <div className="mem-wrapper">
                <div className="memory_image">
                {d.media && (
                        d.media.match(/\.(mp4|mov|avi|mkv)$/i) ? (
                            <video controls width="300" src={`https://gordenarcher.pythonanywhere.com/${d.media}`} />
                        ) : (
                            <img src={`https://gordenarcher.pythonanywhere.com/${d.media}`} alt="memory" width="300" />
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
