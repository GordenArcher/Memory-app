
export const MemoryComp = ({ d }) => {

    const dateCreated = d.date_created;
    const date = new Date(dateCreated);
    const newDate = date.toDateString()

  return (
    <div className="memory-container">
        <div className="mem-wrapper">
            <div className="memory_image">
                <img src={`https://gordenarcher.pythonanywhere.com${d.image}`} alt="memory" />
            </div>
            
            {d.description && 
                <div className="memory-descriptio">
                    <div className="memo-about">
                        <h3>{d.description}</h3>
                        
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
  )
}