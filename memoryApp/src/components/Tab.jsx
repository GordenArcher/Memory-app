import { Link } from "react-router-dom"

export const Tab = () => {
  return (
    <div className="tabs">
        <div className="page_tabs">
            <div className="tab">
                <ul>
                    <li>
                        <Link to={"/"} >
                            <div className="col">
                                <button className="icon">
                                    <i className="bi bi-house"></i>
                                </button>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to={"/upload"} >
                            <div className="col">
                                <button className="icon">
                                    <i className="bi bi-cloud-upload"></i>
                                </button>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/profile'} >
                            <div className="col">
                                <button className="icon">
                                    <i className="bi bi-person"></i>
                                </button>
                            </div>
                        </Link>
                    </li>

                    {/* <li style={{color:'red'}} className='out'>
                        <div className="col">
                            <div className="icon">
                                <i className="bi bi-box-arrow-left"></i>
                            </div>
                        </div>
                    </li> */}
                </ul>
            </div>
        </div>
    </div>
  )
}
