import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { BsMoonStars, BsSun } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate()
    const gotoLoginPage = () => {
    navigate("/login")
    setIsOpen(false)
    
    }
    const gotoRegisterPage = () => {
    navigate("/register")
    setIsOpen(false)
    
    }
    const [isOpen, setIsOpen] = useState(false)
    const [darkTheme, setDarkTheme] = useState(false)
    const toggleNavBar = () => {
        setIsOpen(c => !c)
        
    }
    const toggleDarkTheme = () => {
        setDarkTheme(c => !c)
        changeTheme()
        
    }
    const navigateToHome=()=>navigate("/")
    // const [theme,setTeme]
    const changeTheme = () => {

        // if (localStorage.theme === 'dark' || (!('theme' in localStorage)
        // && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        //     document.documentElement.classList.add('dark')
            
            
        //   } else {
        //     document.documentElement.classList.remove('dark')
        //   }
            document.documentElement.classList.toggle('dark')
            // setDarkTheme(!theme)
    }
    return (
        <div className="sticky top-0 left-0 shadow-lg select-none bg-color_light  dark:bg-color_dark dark:text-white z-20">
            <div className="container mx-auto  h-[60px] items-center  px-4 flex justify-between relative  ">
                <div className="text-2xl font-montserrat cursor-pointer hover:text-slate-950 hover:font-light transition-[color] " onClick={navigateToHome}>Afri-Con</div>
                <ul className="hidden flex-col md:flex-row  md:flex items-center">
                    <li className='links-item mx-4 md:mx-2  my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300'>Bus ticket</li>
                    <li className='links-item mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300'>Bus Here</li>
                    <li className='links-item mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300'>Contact Us</li>

                </ul>
                <ul className={`${!isOpen ? " max-h-0" :
                    " max-h-screen"} overflow-hidden transition-[max-height] duration-500
                    md:hidden absolute top-[60px] left-0 bg-color_light  dark:bg-color_dark dark:text-white  w-full `}>
                    <li className='links-item border-b-2 mx-4 md:mx-2  my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300'>Bus ticket</li>
                    <li className='links-item border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300'>Bus Here</li>


                    <li className='links-item border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300'>Contact Us</li>
                    <div className="flex ">
                        <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            class="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 ml-5 my-4 text-xs font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
  ease-in-out hover:bg-primary-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700
  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
  dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                            onClick={gotoLoginPage}
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            class="inline-block rounded bg-red-400 px-6 pb-2 pt-2.5 ml-5 my-4 text-xs font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
  ease-in-out hover:bg-primary-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700
  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
  dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                            onClick={gotoRegisterPage}
                        >
                            Register
                        </button>
                    </div>

                </ul>
                <div className='hidden md:flex gap-3 items-center'>
                    <div className='hover:bg-slate-300  w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={toggleDarkTheme}>
                        {
                            darkTheme ? <BsMoonStars size={25} /> : <BsSun size={25} />
                        }
                    </div>
                    <button
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
  ease-in-out hover:bg-primary-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700
  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
  dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                        onClick={gotoLoginPage}
                    >
                        Login
                    </button>

                </div>

                <div className='flex md:hidden' >
                    <div className='hover:bg-slate-300  w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={toggleDarkTheme}>
                        {
                            darkTheme ? <BsMoonStars size={25} /> : <BsSun size={25} />
                        }
                    </div>
                    <div className="md:hidden h-[50px] w-[50px] rounded-full flex items-center justify-center hover:bg-slate-300" onClick={toggleNavBar}>

                        {
                            !isOpen ? <AiOutlineMenu size={25} /> : <IoMdClose size={27} />

                        }

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Navbar