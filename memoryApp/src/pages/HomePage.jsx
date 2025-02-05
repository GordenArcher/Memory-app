import '../assets/CSS/home.css'
import { MemoryComp } from '../components/MemoryComp'
import { HomeLoader } from '../components/HomeLoader'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import EmptyImg from '../assets/empty.svg'
import { AuthContext } from '../utils/context/AuthContext'

export const HomePage = () => {

    const { dataFetched, isLoadingData } = useContext(AuthContext)


    const groupUploadsByTimeframe = (uploads) => {
        const now = new Date();
        const today = [];
        const yesterday = [];
        const lastWeek = [];
        const older = [];
    
        uploads.forEach((upload) => {
            const uploadedDate = new Date(upload.date_created);
            const diffTime = now - uploadedDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
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

    const groupedUploads = dataFetched && dataFetched.length > 0 ? groupUploadsByTimeframe(dataFetched) : {};

  return (
    <>
    <div className="home">

        <div className="main_page">
            <main>
                <div className="main-memory">

                    { 
                        isLoadingData 

                        ?
                        
                        <div className="loading">
                            <HomeLoader />
                        </div>

                        :

                        (

                            dataFetched && dataFetched.length > 0 ? 
                        (
                            <div className="main_data">
                                {groupedUploads.today.length > 0 && (
                                    <section>
                                        <h5>Today</h5>
                                        <div className='main_grid'>
                                            {groupedUploads.today.map((upload) => (
                                                <MemoryComp key={upload.id} d={upload} />
                                            ))}
                                        </div>
                                    </section>
                                )}
                                {groupedUploads.yesterday.length > 0 && (
                                    <section>
                                        <h5>Yesterday</h5>
                                        <div className='main_grid'>
                                            {groupedUploads.yesterday.map((upload) => (
                                                <MemoryComp key={upload.id} d={upload} />
                                            ))}
                                        </div>
                                    </section>
                                )}
                                {groupedUploads.lastWeek.length > 0 && (
                                    <section>
                                        <h5>Previous 7 Days</h5>
                                        <div className='main_grid'>
                                            {groupedUploads.lastWeek.map((upload) => (
                                                <MemoryComp key={upload.id} d={upload} />
                                            ))}
                                        </div>
                                    </section>
                                )}
                                {groupedUploads.older.length > 0 && (
                                    <section>
                                        <h5>Older</h5>
                                        <div className='main_grid'>
                                            {groupedUploads.older.map((upload) => (
                                                <MemoryComp key={upload.id} d={upload} />
                                            ))}
                                        </div>
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
                    }
                </div>

            </main>
        </div>
    </div>
    </>
  )
}
