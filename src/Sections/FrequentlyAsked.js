import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
// import { Heading } from "../components"
import AnimatedText from "../components/AnimateText"
import { BsArrowDownLeft } from "react-icons/bs"
import { MdOutlineClose } from "react-icons/md"
import Write from "../components/Write"
const slideUp = {
  initial: {
    y: 100, opacity: 0
  },
  animate: {
    y: 0, opacity: 100,
    transition: {
      duration: 0.5
    }

  }

}
const slideRight = {
  initial: {
    translateX: 100, opacity: 0
  },
  animate: {
    translateX: 0, opacity: 100,
    transition: {
      duration: 0.5
    }

  }

}
const Acc = ({ idx, active, setActive, heading, text }) => {
  const toggle = idx == active
  const boolean = idx & 1
  return (<div className="pb-6 ">
    <motion.div
      initial={{
        x: boolean ? -100 : 100,
        opacity: 0
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 1
        }
      }}
      viewport={{ amount: 0.7, once: true }}
      onClick={() => {
        if (active == idx) {
          setActive(null)
          return
        }
        setActive(idx)
      }}
      className={`py-5 
      ${toggle ? "bg-gradient-to-r from-[#a204f4]  to-[#221c7f]" : " bg-[#f4f4f4] "}
      
      cursor-pointer items-center flex justify-between select-none px-4 `}>
      <AnimatedText
        text={heading}
        inView amount={0.5}
        className={`!capitalize  !text-start
        !text-lg !m-0 !pl-0 !font-black"
        text="Where  can i find information ${!toggle ? "!text-[#221c7f]" : "!text-white"} `}
      />
      <div className={`${!toggle ? "!text-[#221c7f]" : "!text-white"} `}>
        {
          !toggle ? <BsArrowDownLeft size={20} /> : <MdOutlineClose size={20} />
        }

      </div>
    </motion.div>
    <div


      className={`overflow-hidden delay-0
      ${toggle ? "max-h-screen" : "max-h-0 duration-[0.2s]"}  transition-[max-height] duration-[0.8s]
      
      `}
    >

      <p
        className="p-4 px-3 text-sm lg:text-lg"
      >
        {text}
      </p>

    </div>

  </div>)
}
const FrequentlyAsked = () => {
  const [active, setActive] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  return (
    <section className="py-24 overflow-x-hidden bg-white-- dark:text-white text-black lg:px-10 px-5 ">
      <div className="grid gap-x-8 grid-cols-1 lg:grid-cols-12">

        <div className="lg:col-span-4 lg:!sticky0
        
        !top-[4rem] ">
          <div
              className="relative w-full lg:hidden"
            >
              <h1 className="text-6xl text-center 
              absolute- -z-1
              w-full 
              font-black text-gray-500 lg:text-9xl
              bg-white/10-- uppercase opacity-30">
             FAQS
              </h1>

              <AnimatedText
                className="!text-3xl lg:!text-6xl !absolute top-1/2 !m-0 !p-0 -translate-y-1/2 w-full   z-1"
                text={"Frequently asked questions "}
              />

            </div>
          <motion.h1
            variants={slideUp}
            viewport={{ once: true, amount: 0.8 }}
            initial="initial"
            whileInView="animate"
            className='text-center hidden lg:block capitalize text-4xl text-[#181e76] lg:text-5xl font-semibold'
          >Frequently asked questions </motion.h1>
          <motion.p
            ref={ref}
            variants={slideRight}
            viewport={{ once: true, amount: 0.6 }}

            initial="initial"
            whileInView="animate"
            className='lg:text-start text-center my-3 pt-3 leading-snug max-w-3xl mx-auto text-lg'
          >
            {isInView && <Write
              className="!text-lg 
              lg:!text-xl"
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
            />}

          </motion.p>

        </div>
        <motion.div
          className="lg:col-span-8"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1
          }}
        >

          <Acc
            heading="where can i find a company"
            text="We are located at buea cameroon beside ...."
            active={active} setActive={setActive}
            idx={0} />
          <Acc
            heading="How can i booked a ticket"
            text="We are located at buea cameroon beside ...."
            active={active} setActive={setActive}
            idx={2} />

        </motion.div>

      </div>
    </section>
  )
}

export default FrequentlyAsked