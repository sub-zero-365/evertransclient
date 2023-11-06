import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'

const animateVariant = {
    initial: {
        y: 400, opacity: 0
    },
    animate: {
        y: 0, opacity: 0
    }
    , exit: { y: -40, opacity: 0 }

}
const ClearFilter = ({ keys }) => {
    const [querySearch, setQuerySearch] = useSearchParams();


    const handleFilterChange = (key, value = null) => {
        setQuerySearch(preParams => {
            if (value == null) {
                preParams.delete(key)
            } else {
                preParams.set(key, value)
            }
            return preParams
        })

    }
    return (
        <AnimatePresence>
            {
                keys.map((key, index_) => key.split(",")).map(([value, forbidden], index) => {
                    return querySearch.get(value) && querySearch.get(value) !== forbidden && <motion.div
                        key={`${value+forbidden}--${index}`}
                        // initial="initial"
                        // animate="animate"
                        // exit="exit"
                        // varaints={animateVariant}
                        initial={ {
                            y: 400, 
                            opacity: 0,
                        }}
                        animate={ {
                            y: 0, opacity: 1
                        }}
                         exit={ { y: -40, opacity: 0 }}
                        className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-sm tracking-tighter
font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>

                        <span className='absolute cursor-pointer left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
                            onClick={() => {
                                if(window.navigator.vibrate) window.navigator.vibrate([20])
                                handleFilterChange(value)
                            }}

                        >Clear Filter</span>
                        {value} Filter is On  </motion.div>
                })


            }

        </AnimatePresence>
    )

}
export default ClearFilter