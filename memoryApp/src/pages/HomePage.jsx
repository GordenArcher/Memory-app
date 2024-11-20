import '../assets/CSS/home.css'
import { FetchData } from "../utils/hooks/FetchData"
import { MemoryComp } from '../components/MemoryComp'
import { HomeLoader } from '../components/HomeLoader'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import EmptyImg from '../assets/empty.svg'
import { AuthContext } from '../utils/context/AuthContext'

export const HomePage = () => {

    const { data, isLoading } = FetchData()
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const { theme } = useContext(AuthContext)

    useEffect(() => {
        const updateStatus = () => setIsOnline(navigator.onLine);

        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);

        return () => {
            window.removeEventListener("online", updateStatus);
            window.removeEventListener("offline", updateStatus);
        };
    }, []);

    const refreshPage = () => {
        window.location.reload();
    };

    const dark = {
        background: "black",
        color : "white",
    }

    const groupUploadsByTimeframe = (uploads) => {
        const now = new Date();
        const today = [];
        const yesterday = [];
        const lastWeek = [];
        const older = [];
    
        uploads.forEach((upload) => {
            const uploadedDate = new Date(upload.date_created);
            const diffTime = now - uploadedDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
    
            if (diffDays < 1) {
                today.push(upload); 
            } else if (diffDays === 1) {
                yesterday.push(upload); 
            } else if (diffDays <= 7) {
                lastWeek.push(upload); 
            } else {
                older.push(upload); 
            }
        });
    
        return { today, yesterday, lastWeek, older };

    }   

    const groupedUploads = data && data.length > 0 ? groupUploadsByTimeframe(data) : {};

  return (
    <>
    <div className="home" style={theme === "light" ? dark : null}>

        <div className="main_page">
            <main>
                <div className="main-memory">

                    { 
                    !isOnline ? 
                    (
                        <div className='offline' style={{ textAlign: "center", padding: "20px", backgroundColor: "#ffcccc" }}>
                            <p>You are offline. Check your connection.</p>
                            <button onClick={refreshPage} style={{ padding: "10px 20px", cursor: "pointer" }}>
                                Refresh
                            </button>
                        </div>
                    ) 
                    :                 
                    (
                        isLoading 

                        ?
                        
                        <div className="loading">
                            <HomeLoader />
                        </div>

                        :

                        (

                        data && data.length > 0 ? 
                        (
                            <div className="main_grid">
                                {groupedUploads.today.length > 0 && (
                                    <>
                                        <h5>Today</h5>
                                        {groupedUploads.today.map((upload) => (
                                            <MemoryComp key={upload.id} d={upload} />
                                        ))}
                                    </>
                                )}
                                {groupedUploads.yesterday.length > 0 && (
                                    <>
                                        <h5>Yesterday</h5>
                                        {groupedUploads.yesterday.map((upload) => (
                                            <MemoryComp key={upload.id} d={upload} />
                                        ))}
                                    </>
                                )}
                                {groupedUploads.lastWeek.length > 0 && (
                                    <>
                                        <h5>Previous 7 Days</h5>
                                        {groupedUploads.lastWeek.map((upload) => (
                                            <MemoryComp key={upload.id} d={upload} />
                                        ))}
                                    </>
                                )}
                                {groupedUploads.older.length > 0 && (
                                    <section>
                                        <h5>Older</h5>
                                        {groupedUploads.older.map((upload) => (
                                            <MemoryComp key={upload.id} d={upload} />
                                        ))}
                                    </section>
                                )}
                                
                            </div>
                        )
                        :

                        (
                            <div className='empty'>
                                <img src={EmptyImg} alt="" />
                                <p>🌟 Welcome there, love! 💕 <br /> Ready to upload some memories? 🖼️✨ Let&apos;s make them unforgettable!</p>
                                <Link to={"/upload"}>
                                    <button>
                                        <i className='bi bi-cloud-upload'></i>
                                        <span>Start</span>
                                    </button>
                                </Link>
                            </div>
                        )
                        )
                    )
                    }
                </div>

            </main>
        </div>
    </div>
    </>
  )
}
