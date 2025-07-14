import React from 'react';
import "./pagination.css"
const Pagintaion = () => {
    return (
        <div  className='pagintaion'>
            <div className="page previous">Previous </div>
            {[1,2,3,4,5].map(page =>(
                <div  key={page} className="page">
                    {page}
                </div>
            ) )}
            <div className="page next">Next</div>
        </div>
    );
};

export default Pagintaion;