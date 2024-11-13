import '../assets/CSS/home.css'
import { FetchData } from "../utils/hooks/FetchData"
import { Navbar } from "../components/Navbar"
import { MemoryComp } from '../components/MemoryComp'
import { HomeLoader } from '../components/HomeLoader'

export const HomePage = () => {

    const { data, isLoading } = FetchData()

  return (
    <>
    <div className="home">
        <div className="home_page">
            <nav>
                <Navbar />
            </nav>
        </div>

        <div className="main_page">
            <main>
                <div className="main-memory">
                    {
                        isLoading 

                        ?
                        
                        <HomeLoader />

                        :

                        <div className="main_grid">
                            {data.map((d) => {
                                return <MemoryComp key={d.id} d={d} />
                            })}
                    </div>
                    }
                </div>
            </main>
        </div>
    </div>
    </>
  )
}
