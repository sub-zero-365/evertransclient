
import { Helmet } from 'react-helmet'
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import "swiper/css/a11y"
import "swiper/css/scrollbar"
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { toast } from "react-toastify"
import { useState, useRef, createContext, useContext } from 'react'
import { Outlet } from "react-router-dom"

const MailingContext = createContext()

const Mailing = () => {
    const [file, setFile] = useState((window.history.state.file ?? null))
    return (
        <MailingContext.Provider value={{
            file, setFile
        }}>
            <Helmet>
                <title>
                    Mailing
                </title>
            </Helmet>
            <div
                className="md:mt-0 pb-20 md:pb-0 md:h-[calc(100vh-60px)]">
                <div className="container mx-auto md:flex ">
                    <div className="image flex-1 h-[200px] md:h-[calc(100vh-60px)]
        w-full rounded-b-[3rem] md:rounded-none  overflow-hidden p-8">
                        <img
                            // src='https://image.similarpng.com/very-thumbnail/2020/06/Smiley-delivery-man-transparent-PNG.png'
                            // src="https://cdn.pixabay.com/photo/2017/03/01/10/03/businessman-2108029_640.jpg"
                            src="https://i.ibb.co/4KHRwJM/businessman-2108029-640-removebg-preview.png"
                            className="h-full w-full rounded-lg" alt="bus pic" />

                    </div>
                    <div
                        className="-mt-10 mx-4   md:pb-24
md:mt-0 pt-10  md:w-[25rem]  lg:w-[36rem]
md:max-w-[calc(100vw-2.5rem)] md:max-h-[calc(100vh-60px)]  md:overflow-y-auto"
                    >
                        <Outlet />
                    </div>
                </div>

            </div>
        </MailingContext.Provider>
    )
}
export const useMailingContext = () => useContext(MailingContext)

export default Mailing