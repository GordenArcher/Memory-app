import '../assets/CSS/home.css'
import { FetchData } from "../utils/hooks/FetchData"
// import { Loader } from "../components/Loader"
import { Navbar } from "../components/Navbar"
import { MemoryComp } from '../components/MemoryComp'

export const HomePage = () => {
    const { data } = FetchData()
    console.log(data)

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
                    <div className="main_grid">
                        {data.map((d) => {
                            return <MemoryComp key={d.id} d={d} />
                        })}
                    </div>
                </div>
            </main>
        </div>
    </div>
    </>
  )
}
