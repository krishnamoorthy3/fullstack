
// Components
import Card from "../../components/cards/Card"
import Filter from "../../components/filter/Filter"
import Pagination from "../../components/pagination/Pagination"

import "./Product.css"

const Products = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div>
                        <Filter />
                    </div>
                    <div className="product-section">
                        <div className="row">
                            <div className="col-md-2">
                                <Card />
                            </div>
                        </div>
                        <Pagination />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Products
