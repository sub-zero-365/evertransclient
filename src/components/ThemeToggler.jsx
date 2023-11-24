
import { useState } from 'react';
import { BsLightbulb, BsMoonStars, BsSun } from 'react-icons/bs';
import themeToggler from '../utils/themeToggler';

const ThemeToggler = ({ className,
    isDarkThemeEnabled }) => {
    
    const toggleStates = [
        {
            Icon: BsSun,
            title: "light",
            activeColor: "white"
        },
        {
            Icon: BsMoonStars,
            title: "dark",
            activeColor: "bg-slate-800"
        },
        {
            Icon: BsLightbulb,
            title: "gold",
            activeColor: "bg-yellow-400"
        },

    ]

    const [activeIndex, setActiveIndex] = useState(toggleStates?.findIndex((item) => isDarkThemeEnabled == item.title))

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={`${className} max-w-fit flex-col mx-2 border- flex justify-center items-center -p-2 rounded-lg`}
        >

            <div
                className='flex gap-x-1 justify-between items-center'
            >
                {toggleStates.map(({ Icon, title ,activeColor}, idx) => <div

                    key={idx}

                    onClick={() => {
                        themeToggler(title)
                        setActiveIndex(idx)
                    }}
                    className={`border p-1.5  justify-center items-center cursor-pointer flex gap-x-0.5  rounded-sm my-1
                    ${idx == activeIndex ? activeColor  : "bg-green-300"}
                    `}
                >
                    <Icon
                        size={20}
                        color='white'
                    ></Icon>
                    <p
                    className='capitalize'
                    >{title}</p></div>)}
            </div>
        </div>
    )
}

export default ThemeToggler