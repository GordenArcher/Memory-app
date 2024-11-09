import { useState } from "react"

export const PasswordReset = () => {

    const [email, setEmail] = useState("")

    const sendMail = async (e) => {
        e.preventDefault()

        if(!email){
            return
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/send_reset_password_mail/", {
                method:'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email : email})
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
    <div>
        <form onSubmit={sendMail}>

            <input type="email" name="email" value={email} onChange={(e) => {
                setEmail(e.target.value)
            }} />

            <br /> <br />

            <button>Reset</button>
        </form>
    </div>
  )
}
