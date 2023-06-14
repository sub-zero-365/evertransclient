import {motion} from 'framer-motion';
const AnimatePercent = ({className,variants,percent}) => {
percent=isNaN(percent)?"0":percent;
  return (
    <motion.div
    initial="initial"
    animate="initial"
    whileHover="animate"
    className={`w-full- overflow-hidden h-4
  rounded-lg ${className}
 
  mx-2 z-1 relative mt-4 bg-red-500  `}>
    <motion.div
      variants={variants}
      whileInView="animate"
      className='bg-green-500
      flex 
      items-center
      justify-center
      h-full overflow-hidden text-[0.5rem] text-white'
    >
      {percent + "%"}
    </motion.div>
  </motion.div>
  )
}

export default AnimatePercent