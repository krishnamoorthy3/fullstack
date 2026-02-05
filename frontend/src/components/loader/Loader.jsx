
import "./Loader.css"

const Loader = () => {
    return (
            <>
            <div className="back-drop mask align-items-center justify-content-center" style={{display:"flex"}}> 
                <div className="box p-5">
                    <div className="loader"></div>
                </div>
            </div>   
            </>
    )
}

export default Loader
