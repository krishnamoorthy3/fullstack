import { useEffect, useState } from 'react';

// Icons
import { IoIosCloseCircle } from "react-icons/io";

const Search = ({ closeSearch }) => {
    const [searchinput, setSearchinput] = useState("");


    // Debounced Search Effect
    useEffect(() => {
        if(!searchinput) return ;

        const search=setTimeout(() => {
            console.log("Searching for:", searchinput);
        }, 300);

        return () => clearTimeout(search);
    }, [searchinput]);


    return (
        <>
            <div className='search-div'>
                <div className='position-relative'>
                    <button onClick={closeSearch} className='search-cls-btn'><IoIosCloseCircle/></button>
                    <h5 className='text-center mb-4'><strong>Search Product</strong></h5>
                    <input type="text" value={searchinput} className='form-control' onChange={(e) => setSearchinput(e.target.value)} placeholder='Type to Search Product'/>
                    <div className="text-center">
                        <button className='my-4 btn-search'>Search</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search
