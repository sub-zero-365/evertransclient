import { Link } from 'react-router-dom'
import UiButton from './UiButton';
import { Heading } from "./"
import footerbg from '../Assets/images/fooote-bg.jpg'
import logo from "../Assets/images/logo.png"
import { motion } from 'framer-motion';

import { FiFacebook } from "react-icons/fi"
const Footer = () => {
  return (
    <footer

      className=" relative"

    >
      <img className="absolute -z-0  inset-0 w-full h-full "
        src={footerbg}
      />

      <div className="h-full 
       bg-opacity-80 px-5 lg:p-20 sm:px-10  py-10 relative z-1 bg-[#1a1f6f]">

        <div
          className="grid grid-cols-12 gap-x-4"
        >
          <div className="col-span-12  lg:col-span-4">
            <img
              className="w-full max-w-[12rem] h-16"
              src={logo}
            // src="https://web.moxcreative.com/bigtranz/wp-content/uploads/sites/19/2023/03/Logo_bigtranz_1.png"
            />
            <p
              className="my-5 text-lg text-white leading-[1.4rem] tracking-loose"
            >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni doloremque itaque reprehenderit incidunt ut tempore quo. Aspernatur inventore perferendis aperiam.</p>
            <UiButton
              className="!bg-[#ffae02] !my-10 !py-2.5
                    !px-8 !text-lg hover:!bg-purple-600 
                    transition duration-500 cursor-pointer
                    "
            >
              <a
                className='w-full h-full'
                href='tel:6xxxxxx23'>6xxxxxx23</a>
            </UiButton>

          </div>
          <ul className="pb-4 col-span-6 md:col-span-4 lg:col-span-2">

            <li>
              <h1
                className="text-white font-bold text-xl pb-6 tracking-wide"
              >Company</h1>
            </li>

            <li className="pb-1.5 lg:pb-2.5">
              <Link
                to="/about"
                className="text-lg 
                  ease tracking-[0.5] hover:font-medium
                  text-white hover:text-[#ffae02] transition duration-700"
              >
                About us
              </Link>


            </li>
            <li className="pb-1.5 lg:pb-2.5">
              <Link
                to="/about"
                className="text-lg 
                  ease tracking-[0.5] hover:font-medium
                  text-white hover:text-[#ffae02] transition duration-700"
              >
                Leader ship
              </Link>


            </li>
            <li className="pb-1.5 lg:pb-2.5">
              <Link
                to="/about"
                className="text-lg 
                  ease tracking-[0.5] hover:font-medium
                  text-white hover:text-[#ffae02] transition duration-700"
              >
                About us
              </Link>


            </li>
            <li className="pb-1.5 lg:pb-2.5">
              <Link
                to="/about"
                className="text-lg 
                  ease tracking-[0.5] hover:font-medium
                  text-white hover:text-[#ffae02] transition duration-700"
              >
                About us
              </Link>


            </li>
          </ul>
          <ul className="pb-4 col-span-6 md:col-span-4 lg:col-span-2">

            <li>
              <h1
                className="text-white font-bold text-xl pb-6 tracking-wide"
              >Our Services</h1>
            </li>


            <li className="pb-1.5 lg:pb-2.5">
              <Link
                to="/mailing"
                className="text-lg 
                  ease tracking-[0.5] hover:font-medium
                  text-white hover:text-[#ffae02] transition duration-700"
              >
                Mailing Service
              </Link>


            </li>
            <li className="pb-1.5 lg:pb-2.5">
              <Link
                to="/booking"
                className="text-lg 
                  ease tracking-[0.5] hover:font-medium
                  text-white hover:text-[#ffae02] transition duration-700"
              >
                Ticket Booking
              </Link>


            </li>

          </ul>
          <ul className="pb-4 col-span-12 md:col-span-4 lg:col-span-4">

            <li>
              <h1
                className="text-white font-bold text-xl pb-6 tracking-wide"
              >Get In Touch</h1>
            </li>

            <li className="pb-1.5 lg:pb-2.5">
              <div
                to="/about"
                className="text-lg 
                  ease tracking-[0.5] hover:font-medium
                  text-white hover:text-[#ffae02] transition duration-700"
              >
                <div>

                  <p>Buea-southwest ,Cameroon</p>
                </div>
              </div>


            </li>
            <li className="pb-1.5 lg:pb-2.5">
              <Link
                to="/about"
                className="text-lg 
                  ease tracking-[0.5] hover:font-medium
                  text-white hover:text-[#ffae02] transition duration-700"
              >
                About us
              </Link>


            </li>
           
           
            <li className="pb-1.5 pt-2.5 lg:pb-2.5 flex  items-center ">

              <h1
                className='font-bold 
              text-[1rem]
              text-white
              
              '
              >Follow Us</h1>

              <motion.span
                className='text-[#ffae02]'
              >
                <FiFacebook
                  size={20}
                />
              </motion.span>

            </li>
          </ul>
        </div>


        <div
          className="h-[1px] my-5 mt-2 w-full  bg-gray-600"

        />
        <div className='flex flex-col md:flex-row justify-between gap-y-2'>
          <p

            className="text-center text-lg text-white"
          >Copyright © 2023 Bigtranz, All rights reserved. Powered by MoxCreative</p>
          <div>
            <ul className='flex pt-3 items-center gap-x-4 mt-2 mb-5 text-white text-[1rem]'>
              <li className='
              flex gap-x-4  items-stretch hover:text-orange-500 transitio duration-300
              '>
                <p>Terms of Use</p>
                <span
                  className='p-[1px] flex-none   bg-orange-400'
                />
              </li>
              <li className='
              flex gap-x-3  items-stretch hover:text-orange-500 transitio duration-300
              '>
                <Link to={"/policy"}>Privacy Policy</Link>
                <span
                  className='p-[1px] flex-none   bg-orange-400'
                />
              </li>
              <li className='
              flex gap-x-4  items-stretch hover:text-orange-500 transitio duration-300
              '>
                <p>Cookie Policy</p>
                {/* <span
                  className='p-[1px] flex-none   bg-orange-400'
                /> */}
              </li>
            </ul>
          </div>
        </div>
      </div>

    </footer >
  )
}

export default Footer