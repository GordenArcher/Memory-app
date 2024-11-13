import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../assets/CSS/home.css'
import { AuthContext } from '../utils/context/AuthContext';
import { useContext, useState } from 'react';
import { Loader } from '../components/Loader';

export const ViewMenory = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { state } = useLocation()
    const { memoryData } = state || {};
    const { id } = useParams()

    const dateCreated = memoryData.date_created;
    const date = new Date(dateCreated);
    const newDate = date.toDateString()
    const navigate = useNavigate()
    const { token } = useContext(AuthContext)

    const deleteMemory = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:8000/api/delete_image/${id}/`, {
                method:"DELETE",
                headers:{
                    "Authorization":`Token ${token}`
                }
            })

            if(response.ok){
                const data = await response.json()
                console.log(data)
                setIsLoading(false)
            }
            else{
                const errorData = await response.json()
                console.log(errorData)
                setIsLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

  return (
    <div>

        <div className="back" onClick={() => navigate(-1)}>
            <button>
            <i className="bi bi-arrow-left-circle-fill"></i>
            </button>
        </div>

        <div className="main-memory">
            <div className="memory-container" >
                <div className="mem-wrapper">
                    <div className="memory_image">
                        <img src={`https://gordenarcher.pythonanywhere.com${memoryData.image}`} alt="memory" />
                    </div>
                    
                    {memoryData.description && 
                        <div className="memory-descriptio">
                            <div className="memo-about">
                                <h3>{memoryData.description}</h3>
                                
                            </div>
                        </div>
                    }

                    <div className="memory-date">
                        <div className="date">
                            <span>Uploaded on </span>
                            <p>{newDate}</p>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={deleteMemory}>

                <div className="options">
                    <div className="delete">
                        <button>{isLoading ? <Loader /> : "Delete"}</button>
                    </div>
                </div>

            </form>


        </div>
    </div>
  )
}
