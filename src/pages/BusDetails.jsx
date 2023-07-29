import { useParams, Link } from 'react-router-dom'
import { Heading, Form, NextButton, PrevButton } from '../components'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSearchParams } from 'react-router-dom'
import formatQuery from "../utils/formatQueryStringParams"
import { components, style } from "../utils/reactselectOptionsStyles"
import { AnimateError } from '../components'
import { toast } from 'react-toastify'
import { Scrollbar, Pagination, Navigation } from 'swiper'
import { motion } from 'framer-motion'
import { FiRefreshCcw } from 'react-icons/fi'
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
// import Currenttrip from 'react-select'
// import Categories from 'react-select'
// import FromSelect from 'react-select/async'
// import ToSelect from 'react-select/async'
// import { MdOutlineClose } from 'react-icons/md'
// import AnimateText from '../components/AnimateText'
// import ErrorAlert from '../components/Alert'
const token = localStorage.getItem("admin_token");

const BusDetails = () => {
    const focusRef = useRef(null)
    const [busDat, setBusData] = useState({


    })
    async function getCities(inputValue = "") {
        const url = "/admin/allcities";
        try {
            const res = await axios.get(url, {
                headers: {
                    'Authorization': "makingmoney " + token
                },
                params: {
                    search: (inputValue || "")
                }
            })

            return res?.data?.cities
        } catch (err) {
            console.log(err)
            alert("some error occurs")
        }

    }
    const [querySearch, setQuerySearch] = useSearchParams();
    const [tracking_id, setTracking_id] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isDisable, setIsAble] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [err, setErr] = useState(null)
    const [currentOpt, setCurrentOption] = useState([])
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

    const { id } = useParams();
    const [bus, setBus] = useState([])
    const [tickets, setTickets] = useState([])

    const getBus = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get("/bus/" + id,
                {
                    headers: {
                        'Authorization': "makingmoney " + token
                    },
                    params: formatQuery(querySearch.toString())
                }
            )
            const __ = res.data?.bus?.trips?.map(({ tracking_id }, index) => {

                return (
                    {
                        label: index + 1,
                        value: tracking_id
                    }

                )

            })
            setCurrentOption(__)
            setBus(res.data?.bus)
            // setTracking_id(res.data?.bus?.tracking_id);
            setTickets(res.data?.tickets)
            console.log(res.data)

        } catch (err) {
            console.log("error : ", err)

        }
        finally {
            setIsLoading(false)
        }

    }

    const handleResetBus = async (e) => {
        e.preventDefault()
        try {
            await axios.patch("/bus/reset/" + bus._id, busDat,
                {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                }
            )
            setIsOpen(false)

        } catch (err) {
            setErr(err.response.data)
            setTimeout(() => {
                setErr("")
            }, 5000)
            console.log(err)
        }
        finally {
            console.log("done ")
        }
    }

    useEffect(() => {
        getBus()
    }, [querySearch])
    const handleChange = (e) => {
        handleFilterChange("tracking_id", e.value)
    }
    const Text = ({ text }) => <Heading text={text} className="!mb-0 !text-xs !pl-0 line-clamp-1" />
    return (
        <div> bus detail page </div>
    )
}

export default BusDetails