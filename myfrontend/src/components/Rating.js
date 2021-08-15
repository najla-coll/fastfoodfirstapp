import React from 'react'


const Rating = ({rate}) => {
    return (
        <div className='rating'>
            <span>
            <i className={rate >= 1 ? "fa fa-star" : rate >=0.5 ? "fa fa-star-half-o":"fa fa-star-o" }></i>
            </span>
            <span>
            <i className={rate >= 2 ? "fa fa-star" : rate >=1.5 ? "fa fa-star-half-o":"fa fa-star-o" }></i>
            </span>
            <span>
            <i className={rate >= 3 ? "fa fa-star" : rate >=2.5 ? "fa fa-star-half-o":"fa fa-star-o" }></i>
            </span>
            <span>
            <i className={rate >= 4 ? "fa fa-star" : rate >=3.5 ? "fa fa-star-half-o":"fa fa-star-o" }></i>
            </span>
            <span>
            <i className={rate >= 5 ? "fa fa-star" : rate >=4.5 ? "fa fa-star-half-o":"fa fa-star-o" }></i>
            </span>
            
            
            
            
            
         </div>
    )
}

export default Rating


