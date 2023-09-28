import { Footer, Heading } from "../components"
import AnimatedText from "../components/AnimateText"
import bg from '../Assets/images/interior-of-a-regular-intercity-bus.jpeg'
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
const ContactUs = () => {
  return (
    <>
      <div>
        <div className="relative">
          <img className="absolute -z-0 object-cover  inset-0 w-full h-full "
            src={bg}
          />
          <div
            className="min-h-[min(30rem,calc(100vh-4rem))]  z-0 text-white relative flex-col  bg-[#1a1f6f] bg-opacity-60 flex items-center justify-center"
          >
            <AnimatedText
              className="!text-5xl  lg:text-6xl !mb-2"
              text={"Contact Us"}
            />
            <p
              className="text-lg text-center"
            >Be comfortable while you travel with our reliable bus rental.</p>
            <div
              className="border px-5 py-3 rounded-full bottom-6 absolute top-auto left-1/2  -translate-x-1/2 z-1 "
            >
              <div
                className="w-full flex items-stretch gap-x-3"
              >
                <h2 className="font-bold text-lg">
                  <Link to="/" className="cursor-pointer">
                    Home
                  </Link>
                </h2>
                <div
                  className="w-0.5 rotate-12  bg-orange-600 "
                />
                <h2 className="font-bold text-lg">
                  Contact
                </h2>
              </div>
            </div>
          </div>

        </div>
        <div
          className="grid grid-cols-1 gap-y-4 gap-x-6 md:grid-cols-2 lg:grid-cols-3 py-10 px-4 container mx-auto items-start"
        >
          {/* contact information here  */}
          {
            Array.from({ length: 3 }, (arr, index) => <div className="flex text-center 
            
            md:text-start flex-col items-center md:items-start md:justify-end-   lg:flex-row gap-6"
              key={index}
            >
              <motion.div
              
              whileHover={{
                y: -8
            }}
            className=' w-16 h-16 rounded-sm
            left-0 !sticky lg:sticky top-16  bg-[#ffae02]'
              >

              </motion.div>
              <div className="flex-1">
                <h1
                  className=' text-xl text-[#181e76] lg:text-2xl font-semibold'
                >
                  Office Line
                </h1>
                <h3>
                +6221.2002.2012
                </h3>
                <p>
                22 Jakarta - Indonesia 
                </p>
              </div>



            </div>)

          }

        </div>


        <div
          className='md:grid grid-cols-12 gap-4 items-center container mx-auto py-4'
        >
          <div className='col-span-5'>
            <h3>why choose the bus</h3>
            <h1
              className='text-center lg:text-end text-4xl text-[#181e76] lg:text-5xl font-semibold px-4 py-5'
            >
              Enjoy the journey – travel with us
            </h1>

          </div>
          <div className='col-span-7'>

            <p>
              Sed ornare mi rhoncus iaculis elementum elit maximus. Ex facilisis suspendisse velit donec eget nulla venenatis habitasse maecenas conubia urna. Duis imperdiet bibendum velit ligula aptent tempus sed semper pede donec. Odio bibendum dolor malesuada elementum nunc hac vitae lorem rhoncus hendrerit eros.
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </>

  )

}
export default ContactUs