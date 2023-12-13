
import { useState } from 'react';
import { BsLightbulb, BsMoonStars, BsSun } from 'react-icons/bs';
import themeToggler from '../utils/themeToggler';
import { motion } from "framer-motion";
// import { useState } from "react";

const tabs = [ {
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
    ];

const ChipTabs = ({isDarkThemeEnabled}) => {
   const activeIndex= tabs?.findIndex((item) => isDarkThemeEnabled == item.title)
  const [selected, setSelected] = useState(tabs[activeIndex]);

  return (
    <div 
    
    className="px-4 py-0 bg-slate-900-- inline-flex items-center flex-wrap gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab.title}
        >
        
        
      <div


                    className={`
                    border-- p-1.5 
                    justify-center items-center
                    cursor-pointer flex gap-x-0.5 
                    rounded-sm my-1
                    relative z-10
                    
                    `}
                >
                    <tab.Icon
                        size={15}
                        // color='white'
                        className='text-black dark:text-white gold:text-black'
                    ></tab.Icon>
                    {/* <p
                    className='capitalize'
                    >{tab.title}</p> */}
                    </div>
        </Chip>
      ))}
    </div>
  );
};

const Chip = ({
  text,
  selected,
  setSelected,
  children
}) => {
  return (
    <button
      onClick={(e) => {
      e.stopPropagation()
      setSelected(text)
        themeToggler(text.title)
      }}
      className={`${
        selected
          ? "text-white"
          : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
      } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      {/* <span className="relative z-10">{text}</span> */}
      {children}
      
      
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;
// const ThemeToggler = ({ className,
//     isDarkThemeEnabled }) => {
    
//     const toggleStates = [
//         {
//             Icon: BsSun,
//             title: "light",
//             activeColor: "white"
//         },
//         {
//             Icon: BsMoonStars,
//             title: "dark",
//             activeColor: "bg-slate-800"
//         },
//         {
//             Icon: BsLightbulb,
//             title: "gold",
//             activeColor: "bg-yellow-400"
//         },

//     ]

//     const [activeIndex, setActiveIndex] = useState(toggleStates?.findIndex((item) => isDarkThemeEnabled == item.title))

//     return (
//         <div
//             onClick={e => e.stopPropagation()}
//             className={`${className} max-w-fit flex-col mx-2 border- flex justify-center items-center -p-2 rounded-lg`}
//         >

//             <div
//                 className='flex gap-x-1 justify-between items-center'
//             >
//                 {toggleStates.map(({ Icon, title ,activeColor}, idx) => <div

//                     key={idx}

//                     onClick={() => {
//                         themeToggler(title)
//                         setActiveIndex(idx)
//                     }}
//                     className={`border p-1.5  justify-center items-center cursor-pointer flex gap-x-0.5  rounded-sm my-1
//                     ${idx == activeIndex ? activeColor  : "bg-green-300"}
//                     `}
//                 >
//                     <Icon
//                         size={20}
//                         color='white'
//                     ></Icon>
//                     <p
//                     className='capitalize'
//                     >{title}</p></div>)}
//             </div>
//         </div>
//     )
// }

// export default ThemeToggler