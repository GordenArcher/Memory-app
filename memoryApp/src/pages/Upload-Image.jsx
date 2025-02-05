import { useContext, useState } from 'react'
import { AuthContext } from '../utils/context/AuthContext'
import { Loader } from '../components/Loader'
import { toast } from 'react-toastify'
import { Notify } from '../components/Notify'
import uploadImage from '../assets/upload.svg'
import { useNavigate } from 'react-router-dom'


export const UpLoadImage = () => {

    const { token } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [data, setData] = useState({
        description: "",
        media: ""
      })
      const navigate = useNavigate()
      const notify = (e) => toast(e)
    
      const sendImage = async (e) => {
        e.preventDefault()
    
        const formData = new FormData();
        formData.append("description", data.description)
        formData.append("media", data.media)

        if(!data.description.trim()) return notify("Enter a valid Description");

        if(!data.media ) return notify("No Image was selected")
    
        try {
          setIsLoading(true)
          const response = await fetch("https://gordenarcher.pythonanywhere.com/api/v1/send_image/", {
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
            setData({
              description: "",
              media: "",
            });
            setTimeout(() => {
              navigate("/")
            }, 2000)
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

      const handleMediaChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
          setData((currentData) => ({
            ...currentData,
            media: file,
          }));
          
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);  
          };
          reader.readAsDataURL(file); 
        }
      };


  return (
    <div className='u'>
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
                                <div className="upload_input desck up">
                                  <label htmlFor="description" >Description</label>
                                  <input 
                                  type="text" 
                                  name='description' 
                                  value={data.description} 
                                  onChange={(e) => {
                                      setData((currentData) => ({...currentData, description: e.target.value}))
                                  }} 
                                  
                                  />

                                  <button disabled>
                                    <i className='bi bi-paragraph'></i>
                                  </button>
                                </div>

                                <div className="upload_input_image">
                                  <input 
                                    type="file" 
                                    id='upl'
                                    name='media' 
                                    accept="image/*, video/*"
                                    onChange={handleMediaChange}
                                    hidden
                                     />

                                     <label htmlFor="upl">
                                      <div className="inner_sel">
                                        {!image && 
                                        <div className="not_sel_img">
                                          <p>Click to select a media</p>
                                        </div>
                                        }

                                        {image && data.media && (
                                          data.media.type.startsWith('video/') ? (
                                            <div className='media_sel'>
                                              <video controls src={image} width="300"  />
                                              <div className="remove_video">
                                                <button onClick={() => setImage(null)}>
                                                <span>Remove</span>
                                                <i className='bi bi-trash'></i>
                                                </button>
                                              </div>
                                            </div>
                                            
                                          ) : (
                                            <div className='media_sel'>
                                              <img src={image} alt="preview" width="300" />
                                              <div className="remove_image">
                                                <button onClick={() => setImage(null)}>
                                                  <span>Remove</span>
                                                  <i className='bi bi-trash'></i>
                                                </button>
                                              </div>
                                            </div>
                                            
                                          )
                                        )}
                                        
                                      </div>
                                     </label>

                                    
                                </div>

                                  <div className="upload_button" style={{position:"relative", marginTop: image ? "200px" :"0"}}>
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
