import {motion} from 'framer-motion'

export default function AnimateError({error,errorMessage}) {

    return (
        <div className="mb-6 flex
        items-center
        justify-between
        text-xs font-medium
        md:text-sm
        text-orange-600">
            <motion.h1
                animate={{
                    opacity: error ? 1 : 0,
                    x: error ? [-100, 100, 0, -100, 100, 0] : null

                }}
                transition={{ duration: 0.3 }}
                className="w-fit flex-none mx-auto tracking-[0.2rem] underline underline-offset-4 mt-0.5  text-center ">  {errorMessage || "empty error box with no message"}</motion.h1>
        </div>

    )
}