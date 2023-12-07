import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { BsBusFront } from "react-icons/bs"
import { MdOutlineForwardToInbox } from "react-icons/md"
import Heading from './Headings'
import AnimatedText from './AnimateText'
import { ArrowDownToLine, CheckCircle, Leaf,BusFront } from "lucide-react";
import WriteInView from './WriteInView'
{/* <BusFront /> */}
export default function OurServices() {
  const perks = [
    {
      name: "Instant Delivery.",
      icon: BusFront,
      description: "Get  your assets delivered to your email in seconds and download them right away"
    },
    {
      name: "Guranteed  Quality.",
      icon: CheckCircle,
      description: "Every assets on our platfprm is verified by our team to ensure our highest quality standards.Not happy we offer a 30-day refund guarantee."
    },
    {
      name: "For the Planet.",
      icon: Leaf,
      description: "We pledge 1% of the sales to the preservation of the natural environment."
    },
  ]
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
  const Service = ({ index, text, title, icon: Icon, imgUrl }) => {
    return (
      <motion.div
        style={{
          transformOrigin: "bottom"
        }}
        whileHover={{
          scale: 0.9,
          transition: {
            duration: 0.3
          }
        }}
        initial={{
          y: index & 1 ? 100 : 50,
          opacity: 0
        }}
        whileInView={{ y: 0, opacity: 100 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: 1,
          mass: 20 + (index * 5),
          stiffness: "spring"
        }}

        className='p-2 rounded-md border cursor-pointer group ppt  bg-gradient-to-b from-white  to-[#fcfcf7]'>
        <div className='bg-[#eceff4] gold:bg-orange-100 dark:bg-slate-400 text-center p-4 py-10 group-hover:-translate-y-10 transition-all duration-500'>
          <img
            className="mx-auto block  w-24 h-24 "
            src={imgUrl}
          />
          <Heading
            className="!text-[#181e76] !text-3xl !font-semibold"
            text={title}
          />
          {text}
        </div>
      </motion.div>

    )
  }

  return (

    <div className=" lg:px-10 overflow-x-hidden px-6  text-black-- text-lg py-24 md:text-xl lg:text-xl
    " id="#ourservices">

      <div
        className="relative w-full"
      >
        <h1 className="text-6xl text-center 
              absolute- -z-1
              w-full 
              font-black text-gray-500 lg:text-9xl
              bg-white/10-- uppercase opacity-30">
          SERVICES
        </h1>

        <AnimatedText
          className="!text-4xl dark:text-white lg:!text-6xl !absolute top-0 !m-0 translate-y-1/2    z-1"
          text={"OUR SERVICES"}
        />

      </div>
      <motion.h1
        variants={slideUp}
        viewport={{ once: true, amount: 0.8 }}
        initial="initial"
        whileInView="animate"
        className='text-center text-4xl text-[#181e76] dark:text-blue-600 gold:text-[var(--color-primary)] lg:text-5xl font-semibold'
      >We Provide Best Services For You</motion.h1>
      <motion.p

        variants={slideRight}
        viewport={{ once: true, amount: 0.6 }}

        initial="initial"
        whileInView="animate"
        className='text-center my-3 pt-3 leading-snug max-w-3xl mx-auto dark:text-white'
      >
        At  the heart of Arriva is an ambition to make passenger
        transport the best choice as we look to connect people with our
        local communities to all the things that are important
        to them -safety,reliably,and sustainably
      </motion.p>


      <div
        className="grid grid-cols-1  gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3  lg:gap-x-8 lg:gap-y-0"
      >
        {
          perks.map(({ icon: Icon, description, name }, index) =>

            <motion.div
              style={{
                transformOrigin: "bottom"
              }}
              whileHover={{
                scale: 0.9,
                transition: {
                  duration: 0.3
                }
              }}
              initial={{
                y: index & 1 ? 100 : 50,
                opacity: 0
              }}
              whileInView={{ y: 0, opacity: 100 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 1,
                mass: 20 + (index * 5),
                stiffness: "spring"
              }}
              key={index}
              className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
            >
              <div
                className="md:flex-shrink-0 flex justify-center"
              >
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <Icon
                    className="w-1/3 h-1/3"
                  />
                </div>
              </div>
              <div
                className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-0"
              >
                <WriteInView
                  message={name}
                />
                {/* <h3
                  className="text-base font-medium text-gray-900"
                >{name}

                </h3> */}
                <p
                  className="mt-3 text-sm lg:text-lg text-muted-foreground"
                >{description}</p>
              </div>
            </motion.div>)
        }

      </div>
    </div>


  )
}

