
import { IoOptionsSharp } from "react-icons/io5";
import "./Filter.css"


const Filter = () => {
    return (
        <>
            <div className="filter-section my-5">
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <button className="filter-btn"><IoOptionsSharp className="filter-icon" /> Filter</button>

                        <div>
                            <label htmlFor=""><strong>Sort By:</strong></label>
                            <select name="sortBy" id="filter_sortby">
                                <option value="">Price, Low - high</option>
                                <option value="">Price, high - low</option>
                                <option value="">Date, New - Old</option>
                                <option value="">Date, Old - New</option>
                            </select>
                        </div>
                        
                    </div>
                    <p>Showing 12 of 100 products</p>
                </div>
            </div>
        </>
    )
}

export default Filter
