import { Link, useParams, useNavigate } from 'react-router-dom'
import {
    Heading,PrevButton,
    NextButton
}
    from '../components'
import { useSearchParams } from 'react-router-dom'
import samplePDF from "../Assets/afrique-con boarding passs.pdf"
import { getBuses } from '../utils/ReactSelectFunction'
import DownloadSelect from "react-select"
import { components, style } from "../utils/reactselectOptionsStyles"
import { useState, useEffect } from 'react'
import BusSelect from 'react-select/async'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper'
// import { MobilePDFReader } from 'react-pdf-viewer';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const SeatDetails = () => {
    const [querySearch, setQuerySearch] = useSearchParams();
    const [loading, setLoading] = useState(false)
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
    const handleChange = ({ value }, key) => {
        if (querySearch.get(key) === value) {
            return
        }
        handleFilterChange(key, value);
    }
    const { id } = useParams()
    const [seats, setSeats] = useState([])
    const navigate = useNavigate()

    const handleClick = async (index) => {
        try {
            const res = await axios.get(`/seat/ticket/${id}/${index}`)
            navigate(`/dashboard/${res.data.id}?admin=true`)

        } catch (err) {
            console.log("err", err)
        } finally {

        }
    }
    const getSeats = async () => {
        setLoading(true)
        try {
            const res = await axios.get("/seat/specific/" + id, {}, {});
            setSeats(res.data.seat)
        } catch (err) {
            console.log(err)
            alert("fail to get seat" + err.response.data)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getSeats()
    }, [])
    const downloadOptions = [


        {
            label: "download all tickets", value: "all"
        },
        {
            label: "deactive tickets", value: "deactive tickets"
        },


    ]
    if (loading) return <div>Loading ....</div>

    return (
        <div className="!flex-1 h-[calc(100vh-60px)] container mx-auto overflow-y-auto pb-24">
            <nav class="flex mb-5 mt-5 px-5 lg:hidden" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <Link
                            relative="path"
                            to={"../"}
                            href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            Seats
                        </Link>
                    </li>
                    <li>
                        <div class="flex items-center" >
                            <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Seats Details</h1>
                            </a>
                        </div>
                    </li>

                </ol>
            </nav>

            {/* contnet dhere e */}


            <div className="lg:flex flex-row-reverse lg:flex-row gap-x-6">
                <div className="flex-none lg:w-[25rem]">

                    <div className="flex-none w-[min(calc(100%-20px),200px)] mx-auto">
                        <Heading text={"Assign a bus to seat"} className="!text-[0.8rem] !text-center !pl-0 !mb-0 uppercase text-slate-400" />
                        <BusSelect
                            defaultOptions
                            catcheOptions
                            loadOptions={getBuses}
                            required
                            styles={{
                                ...style,
                                wdith: "100%",
                                fontSize: 10 + "px"
                            }}
                            components={components()}
                            className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                        />
                    </div>

                    <a role='link' aria-disabled
                        href={`${process.env.REACT_APP_LOCAL_URL}/seat/download/${id}?${querySearch.toString()}`}

                        target="_blank"

                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="
        text-center
                    w-[min(400px,calc(100%-2.5rem))]
                     bottom-0
                     pb-2
                     block
                     min-h-[2rem]
                     mx-auto
                    rounded bg-blue-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
transition duration-150 ease-in-out hover:bg-blue-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                        download borderaux
                    </a>

                    {/* [rrjsfgjsofhdgihsdfhg] */}
                    <Heading text={"Seat Details"} className="!mb-3" />

                    <div className="flex justify-between px-2 pb-2">
                        <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                            <span className="w-[10px] mr-1 h-[10px] inline-block bg-green-400 rounded-full "></span>Available</h1>
                        <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                            <span className="w-[10px] mr-1 h-[10px] inline-block bg-blue-400 rounded-full "></span>Rerservation
                        </h1>
                        <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                            <span className="w-[10px] mr-1 h-[10px] inline-block bg-orange-400 rounded-full "></span>
                            Not Available
                        </h1>
                    </div>

                    {/* code here */}
                    <div className="grid gap-x-1 px-4 gap-y-0.5 pt-3 grid-cols-5">

                        {

                            seats?.seat_positions?.map(({ isTaken, isReserved, _id }, index) => {
                                return (
                                    <button
                                        onClick={() => {
                                            if (isTaken === true || isReserved == true) {
                                                handleClick(_id)
                                            }
                                        }}
                                        className={`
                ${(isTaken) ? "bg-orange-400" : isReserved ? "!bg-blue-500" : "bg-green-400"}
                 grid items-center 
                justify-center 
                shadow 
                rounded-sm min-h-[60px]
                cursor-pointer
                hover:rounded-lg`}
                                    > {(index + 1)}</button>
                                )


                            })}


                    </div>



                </div>
                <div className="flex-1 lg:max-h-[calc(100vh-60px)] overflow-y-auto px-5">
                    <Document className="max-h-screen mx-auto overflow-y-auto bg-white dark:!bg-slate-900"
                        file={`${process.env.REACT_APP_LOCAL_URL}/seat/download/${id}`}
                    >
                        <Swiper  slidesPerView={1}
                                modules={[Autoplay, Navigation]}
                                autoplay={{
                                    delay: 25000,
                                    disableOnInteraction: false
                                  }}
                                navigation={{
                                    prevEl: ".arrow__left",
                                    nextEl: ".arrow__right",
                                }}>
                                 <PrevButton className="!left-1.5" />
                                <NextButton className="!right-1.5" />
                            {
                                [1, 2, 3].map((arr, index) => {
                                    return (
                                        <SwiperSlide className="group relative">
                                            <Page
                                            className="!mx-0 !py-0
                                            group-[.swiper-slide-active]:!z-10 
                                            group-[.swiper-slide-active]:!opacity-100
                                            group-[.swiper-slide-active]:!rotate-0
                                            group-[.swiper-slide-active]:!scale-100
                                            absolute inset-0 h-full w-full 
                                            scale-[0.5]
                                            rotate-45
                                            opacity-0
                                            z-[-100]
                                            ease duration-[1s] transition-all" 
                                            pageNumber={index + 1} key={index} />
                                        </SwiperSlide>
                                    )

                                })
                            }
                        </Swiper>
                    </Document>
                </div>

            </div>


        </div >
    )

}

export default SeatDetails