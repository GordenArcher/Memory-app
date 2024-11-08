
import { useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState({
    description: "",
    image: ""
  })

  const sendImage = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("image", data.image);

    try {

      const response = await fetch("http://127.0.0.1:8000/api/send_image/", {
        method:"POST",
        headers:{
          'Authorization': 'Token c4fa23431583920b135b668fc9902efb7b6480a7'
        },
        body : formData,
      })
      
      if(response.ok){
        const data = await response.json()
        console.log(data)
      }else{
        const errorData = await response.json()
        console.log(errorData)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <form 
    onSubmit={sendImage}
    >
      <input type="text" name='description' value={data.description} onChange={(e) => {
        setData((currentData) => ({...currentData, description: e.target.value}))
      }} />
      <br /> <br />

      <input 
      type="file" 
      name='image' 
      onChange={(e) => {
          setData((currentData) => ({
            ...currentData,
             image: e.target.files[0]
            }))
      }} />

      <br /><br />

      <input type="submit" />
    </form>
    </>
  )
}

export default App
