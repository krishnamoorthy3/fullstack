
import productimg from "../../assets/images/product/product1.webp"
import { FaRegHeart } from "react-icons/fa";
import "./Card.css"

const Card = () => {
    return (
        <>
            <div className="card position-relative">
                <div className="card-header">
                    <img src={productimg} alt="Product" className="w-100" />
                </div>
                <div className="card-content py-3">
                    <h5>product Title</h5>
                    <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, nihil eveniet porro culpa id cupiditate! Praesentium provident harum ut tempore quidem ea, sequi veritatis cumque. Porro sunt adipisci dignissimos id.</p>
                    <div className="d-flex gap-2">
                        <span className="after-discount-price">
                            $299
                        </span>
                        <span className="org-price">
                            $399
                        </span>
                        <span className="discount-c">  
                            10% Off
                        </span>
                    </div>
                </div>
                <button className="position-absolute"><FaRegHeart /></button>
            </div>
        </>
    )
}

export default Card
