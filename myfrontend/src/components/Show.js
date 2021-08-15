import React from 'react'
import {Carousel} from 'react-bootstrap'



const Show = () => {
    return (
        <div className="show">
               <Carousel>
               <Carousel.Item>
               <img
                 className="d-block w-100"
                 src="https://www.lantmannen-unibake.com/globalassets/_global-en/decks--images/f-1140x400---limit-spot-1/1140x400---category----fastfood.jpg"
                 alt="First slide"
               />
               <Carousel.Caption>
               <h3>Nothing like a good hamburger accompanied by delicious fries with sauce</h3>
     
               </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
               <img
               className="d-block w-100"
               src="https://cdn.downtoearth.org.in/library/large/2019-03-05/0.89399200_1551782137_fast1.jpg"
               alt="Second slide"
               />

               <Carousel.Caption>
               <h3>It is very practical: the speed of preparation and the ease of eating it</h3>
   
               </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
               <img
               className="d-block w-100"
               src="https://img.ohmymag.com/article/news/les-premiers-fast-food_a3b3f5004c281bf986fedd3d74bd53ab8154819e.jpg"
               alt="Third slide"
               />

               <Carousel.Caption>
                <h3>fast food is accessible around the clock, and it can be found everywhere in a big city</h3>
      
               </Carousel.Caption>
               </Carousel.Item>
               </Carousel>
        </div>
    )
}

export default Show
