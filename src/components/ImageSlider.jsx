import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './imageslider.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import ImageMagnifier from './ImageViewer.jsx';

export default function ImageSlider({imgUrl}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className='image-slider'>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}

                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide>
                    <ImageMagnifier
                        magnifierHeight={200}
                        magnifieWidth={200}

                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9432HMkE8UY6arK5N_9TpqtVp8EYVO1CXVb_LUZxi-tR6ThrB3v3qfNWX0KNPPPj0ksQ&usqp=CAU"}
                    />
                </SwiperSlide>
                <SwiperSlide>
                <ImageMagnifier
                        magnifierHeight={200}
                        magnifieWidth={200}
                        src="data:image/jpeg;base64,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"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    
                <ImageMagnifier
                        magnifierHeight={200}
                        magnifieWidth={200}
                        src='https://images.theconversation.com/files/368263/original/file-20201109-22-lqiq5c.jpg?ixlib=rb-1.1.0&rect=10%2C0%2C6699%2C4476&q=45&auto=format&w=926&fit=clip'
                    />
                </SwiperSlide>
                <SwiperSlide>
                <ImageMagnifier
                        magnifierHeight={200}
                        magnifieWidth={200}
                        src='https://images.theconversation.com/files/368263/original/file-20201109-22-lqiq5c.jpg?ixlib=rb-1.1.0&rect=10%2C0%2C6699%2C4476&q=45&auto=format&w=926&fit=clip'
                    />
                </SwiperSlide>


            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src='https://images.theconversation.com/files/368263/original/file-20201109-22-lqiq5c.jpg?ixlib=rb-1.1.0&rect=10%2C0%2C6699%2C4476&q=45&auto=format&w=926&fit=clip' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src='https://images.theconversation.com/files/368263/original/file-20201109-22-lqiq5c.jpg?ixlib=rb-1.1.0&rect=10%2C0%2C6699%2C4476&q=45&auto=format&w=926&fit=clip'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='https://images.theconversation.com/files/368263/original/file-20201109-22-lqiq5c.jpg?ixlib=rb-1.1.0&rect=10%2C0%2C6699%2C4476&q=45&auto=format&w=926&fit=clip' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src='https://images.theconversation.com/files/368263/original/file-20201109-22-lqiq5c.jpg?ixlib=rb-1.1.0&rect=10%2C0%2C6699%2C4476&q=45&auto=format&w=926&fit=clip' />
                </SwiperSlide>

            </Swiper>
        </div>
    );
}
