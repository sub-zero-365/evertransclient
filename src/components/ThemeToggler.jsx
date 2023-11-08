import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useState } from 'react';
const ThemeToggler = ({ toggleDarkTheme }) => {
    const toggleStates = [
        "light", "dark", "gold"
    ]
    // const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const Button = ({ name }) => {
        return (<div className='bg-orange-400'>
            {name}
        </div>)
    }
    const [swiperRef, setSwiperRef] = useState(null);
    const nextSlide = () => {
        swiperRef.slideNext();
    };
    const prevSlide = () => {
        swiperRef.slidePrev();
    };
    const [activeIndex, setActiveIndex] = useState(0)
    // console.log(swiperRef)
    return (
        <div
            onClick={e => e.stopPropagation()}
            className='max-w-fit flex-col mx-2 border- flex justify-center items-center -p-2 rounded-lg'
        >
           


            <div
                className='flex gap-x-1 justify-between items-center'
            >
                {toggleStates.map((state, idx) => <div
                    key={idx}

                    onClick={() => {
                        toggleDarkTheme(toggleStates[idx])
                        setActiveIndex(idx)
                    }}
                    className={`border  justify-center items-center flex cursor-pointer  p-1 rounded-sm my-1
                    ${idx == activeIndex ? "!bg-blue-700" : "bg-green-300"}
                    `}
                >{state}</div>)}
            </div>
        </div>
    )
}

export default ThemeToggler