import React from 'react'
import 'rsuite/dist/rsuite-no-reset.min.css';
import { Carousel } from 'rsuite';
function ImagesCarousel({ selectedImages }) {
    return (
        <div className='mx-auto w-[35rem] h-[25rem] flex justify-center items-center'>
            <Carousel autoplay className="custom-slider">
                {selectedImages.map((image, i)=>{
                    return (
                        <img src={image} className='w-[35rem] h-[25rem]' alt="" />
                    )
                })}
            </Carousel>
        </div>
    )
}

export default ImagesCarousel;