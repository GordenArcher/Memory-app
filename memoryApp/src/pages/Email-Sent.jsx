import SentImage from '../assets/done-email.svg'
export const EmailSent = () => {
  return (
    <div className='email-done'>
        <div className="padd">
            <div className="mail-sent">
                <img src={SentImage} alt="mail sent" />
            </div>

            <div className="sent_mess">
                <h2>check your mail to reset your password...</h2>
            </div>
        </div>
    </div>
  )
}
