import { useContext, useState } from 'react'
import { AuthContext } from '../utils/context/AuthContext'
import { Loader } from '../components/Loader'
import { toast } from 'react-toastify'
import { Notify } from '../components/Notify'
import uploadImage from '../assets/upload.svg'
import { Navbar } from '../components/Navbar'


export const UpLoadImage = () => {

    const { token } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [data, setData] = useState({
        description: "",
        image: ""
      })

      const notify = (e) => toast(e)
    
      const sendImage = async (e) => {
        e.preventDefault()
    
        const formData = new FormData();
        formData.append("description", data.description);
        formData.append("image", data.image);

        if(!data.description.trim()) return notify("Enter a valid Description");

        if(!data.image ) return notify("No Image was selected")
    
        try {
          setIsLoading(true)
          const response = await fetch("http://127.0.0.1:8000/api/send_image/", {
            method:"POST",
            headers:{
              'Authorization': `Token ${token}`
            },
            body : formData,
          })
          
          if(response.ok){
            const data = await response.json()
            console.log(data)
            notify("Memory Uploaded")
            setIsLoading(false)
            setData("")
            formData("")
          }else{
            const errorData = await response.json()
            console.log(errorData)
            notify(errorData)
            setIsLoading(false)
          }
    
        } catch (error) {
          console.log(error)
        }
        finally{
          setIsLoading(false)
        }
      }

      const handleImageChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
          setData((currentData) => ({
            ...currentData,
            image: file
            }))

          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result); 
          };
          reader.readAsDataURL(file); 
        }
      };


  return (
    <div className='u'>
      <Navbar />
        <div className="upload_data">
            <div className="upload_wrapper">
                <div className="upload_left">
                  <div className="upload_left_wrap">
                    <div className="message">
                      <span>Welcome, my love! 💖<br /> Upload your favorite memory and make my heart smile! 😘</span>
                    </div>

                    <div className="upload_left_image">
                      <img src={uploadImage} alt="upload image"/>

                    </div>
                  </div>
                </div>

                <div className="line"></div>

                <div className="upload_right">
                    <div className="upload_right_wrapper">
                        <div className="upload_auth">
                            <form onSubmit={sendImage}>
                                <div className="upload_form">
                                  <div className="upload_input desck">
                                    <label htmlFor="description">Description</label>
                                    <input 
                                    type="text" 
                                    name='description' 
                                    value={data.description} 
                                    onChange={(e) => {
                                        setData((currentData) => ({...currentData, description: e.target.value}))
                                    }} />

                                    <button>
                                      <i className='bi bi-paragraph'></i>
                                    </button>
                                  </div>

                                  <div className="upload_input_image">
                                    <input 
                                      type="file" 
                                      name='image' 
                                      accept="image/*"
                                      onChange={handleImageChange} />

                                    {
                                      
                                    image && 
                                      <img src={image} alt="image selected" style={{ maxWidth: "250px", marginTop: "20px" }} />
                                    }
                                  </div>

                                    <div className="upload_button">
                                      <button>{isLoading ? <Loader /> : "Upload"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Notify />
    </div>
  )
}
