import '../assets/CSS/home.css'
import { FetchData } from "../utils/hooks/FetchData"
import { MemoryComp } from '../components/MemoryComp'
import { HomeLoader } from '../components/HomeLoader'
import { useEffect, useState } from 'react'

export const HomePage = () => {

    const { data, isLoading } = FetchData()
    const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  return (
    <>
    <div className="home">

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
                        
                        <HomeLoader />

                        :

                        <div className="main_grid">
                            {data.map((d) => {
                                return <MemoryComp key={d.id} d={d} />
                            })}
                        </div>
                    )
                    }
                </div>

            </main>
        </div>
    </div>
    </>
  )
}
