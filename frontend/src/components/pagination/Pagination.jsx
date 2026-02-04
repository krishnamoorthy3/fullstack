
import { MdOutlineKeyboardArrowLeft ,MdOutlineKeyboardArrowRight} from "react-icons/md";

import './Pagination.css'


const Pagination = () => {
    
    return (
        <>
            <div>
                <ul className='d-flex align-item-center pagination-ul my-5 justify-content-center'>
                    <li><button><MdOutlineKeyboardArrowLeft/></button></li>
                    <li><button className="pag-active">1</button></li>
                    <li><button>2</button></li>
                    <li><button>3</button></li>
                    <li><button>4</button></li>
                    <li><button>5</button></li>
                    <li><button><MdOutlineKeyboardArrowRight/></button></li>
                </ul>
            </div>
        </>
    )
}

export default Pagination
