// import { style } from "../utils/reactselectOptionsStyles"
import LoadingButton from '../components/LoadingButton'
import { CiLocationOn } from "react-icons/ci"
import { WiTime4 } from "react-icons/wi"
import { GiPathDistance } from "react-icons/gi"
import InputBox from "../components/InputBox"
import { getCities } from "../utils/ReactSelectFunction";
import { useNavigate, useSearchParams, Link, useNavigation, useLocation } from "react-router-dom"
import {
    Heading,
} from "../components"
import { useState, forwardRef, useRef } from "react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineArrowRight, AiOutlineCloudUpload } from 'react-icons/ai'
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import TimeSelect from 'react-select'
import { timeOptions } from '../utils/sortedOptions'
import { useMailingContext } from "../pages/Mailing"
import { toast } from "react-toastify"
import { BsCreditCard2Front, BsFillPersonFill, BsTelephoneMinus } from 'react-icons/bs'

import { GrCircleInformation } from 'react-icons/gr'
import dayjs from "dayjs"
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedText from './AnimateText'
const MailingForm = () => {
    const location = useLocation()
    const state = location.state || {};
    console.log("this is the state value ", state, location)
    const style = {
        control: (base, { isFocused, isSelected }) => ({
            ...base,
            border: "1px solid black",
            boxShadow: "none",
            background: "transparent",
            borderRadius: "5px",
            fontSize: 1 + "rem",
            cursor: "pointer",
        }
        )
    }

    const fileRef = useRef(null)
    const formRef = useRef(null)

    const navigate = useNavigate()

    const loadDemoData = async (evt) => {
        evt.preventDefault()
        const formdata = new FormData(evt.target)

        const data = Object.fromEntries(formdata)
        if (data.registerdate) {
            data.registerdate = dayjs(data.registerdate).format("YYYY-MM-DD")
        }
        const { from, to } = data
        if (from == to) return toast.error("cities should not be thesame!")
        console.log("this i sthe source data here", data)

        navigate(`preview`, {
            state: {
                ...data,
                file
            }
        })
    }
    const [startDate, setStartDate] = useState(new Date());


    const {
        file, setFile } = useMailingContext()


    const handleFileChange = () => {
        const file = fileRef.current.files[0]
        if (!file) return
        setFile(file)

    }


    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div
            className="w-full
      border-b
      mt-[20px]
      mx-4
      shadow-sm border-black 
      gap-2
      p-1 
      rounded-0
      bg-transparent my-1  "
            onClick={onClick} ref={ref}>

            <Heading text="Date" className={"!pl-0 !mb-1 !mt-2 !text-lg first-letter:text-2xl first-letter:font-semibold"} />

            <div className="flex-1">
                <h4 className="text-sm leading-6 capitalize"> {value}</h4>
                <p className="text-xs md:text-lg text-slate-500 font-[500]">{value && (new Date(value).toDateString())}</p>
            </div>
        </div>
    ));

    return (
        <div>

            <form onSubmit={loadDemoData}
                ref={formRef}
            >
                <div>

                    <input
                        ref={fileRef}
                        accept="image/jpeg, image/png, image/jpg"
                        type="file"
                        className="hidden"
                        id="file"
                        name='images'
                        onChange={handleFileChange}

                    />
                    <label htmlFor="file"
                        className="cursor-pointer"
                    >
                        <AiOutlineCloudUpload
                            size={80}
                            className='mx-auto text-center'
                        />
                        <AnimatedText
                            text="upload product image"
                            className='!text-2xl '

                        />
                    </label>
                    <div className=''>
                        <AnimatePresence
                            initial={false}
                        >


                            {
                                file && <motion.img
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    exit={false}
                                    alt='mails image'
                                    src={file ? URL.createObjectURL(file) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAVXZhlM-qA4bg_bOHRutl3wQVQdAbSWx_A&usqp=CAU'}
                                />
                            }



                        </AnimatePresence>

                    </div>

                </div>

                <div className="flex flex-col justify-center items-center mt-4">

                    <DatePicker
                        inline={false}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                        Date={new Date()}
                        required
                        customInput={<ExampleCustomInput />
                        }
                    />
                    <input
                        type="hidden"
                        name='registerdate'
                        value={startDate}
                    />
                </div>

                <div className="flex items-center !mb-1 !mt-2 gap-x-2">
                    <CiLocationOn size={20}
                        className="text-rose-600"
                    />
                    <Heading text="From" className={"!m-0 !p-0 !text-lg first-letter:text-2xl first-letter:font-black"} />
                </div>
                <FromSelect
                    isSearchable={false}
                    name='from'
                    defaultOptions
                    catcheOptions
                    loadOptions={getCities}
                    required
                    label="Destination"
                    placeholder="Starting Point"
                    styles={{
                        ...style,
                        wdith: "100%",
                        fontSize: 10 + "px"
                    }}
                    components={{ IndicatorSeparator: () => null }}
                    className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"

                />


                <div className="flex items-center !mb-1 !mt-2 gap-x-2">
                    <GiPathDistance size={20}
                        className="text-rose-600"
                    />
                    <Heading text="Destination" className={"!m-0 !p-0 !text-lg first-letter:text-2xl first-letter:font-black"} />
                </div>
                <ToSelect
                    isSearchable={false}
                    name='to'
                    defaultOptions
                    catcheOptions
                    loadOptions={getCities}
                    required
                    placeholder="Destination"

                    styles={{
                        ...style,
                        wdith: "100%",
                        fontSize: 10 + "px"
                    }}
                    components={{ IndicatorSeparator: () => null }}

                    className="dark:bg-slate-900 mx-2 text-black text-xs min-h-8 md:text-xl "

                />



                <div className="flex items-center !mb-1 !mt-2 gap-x-2">
                    <WiTime4 size={20}
                        className="text-rose-600"
                    />
                    <Heading text="Time" className={"!m-0 !p-0 !text-lg first-letter:text-2xl first-letter:font-black"} />
                </div>
                <TimeSelect
                    name="time"
                    styles={style}
                    isSearchable={false}
                    components={{ IndicatorSeparator: () => null }}
                    required className="dark:bg-slate-900 mx-2 text-black text-xs min-h-8 md:text-xl mb-6"
                    defaultValue={{
                        label: "7am",
                        value: "7am"
                    }}
                    options={timeOptions} />
                <div className='px-2'>
                    <div className="flex items-end pb-2 justify-start gap-x-4">
                        <BsTelephoneMinus
                            size={20}
                        />
                        <h1 className='text-xl  font-light '>Product Name</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                    </div>

                    <InputBox
                        className="!min-h-[3rem]"
                        name="name"
                        defaultValue={state.name}
                        hidden
                        type="text"
                    />
                </div>
                <div className='px-2'>
                    <div className="flex items-end pb-2 justify-start gap-x-4">
                        <BsTelephoneMinus
                            size={20}
                        />
                        <h1 className='text-xl  font-light '>Estimated Price for Product</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                    </div>

                    <InputBox
                        className="!min-h-[3rem]"
                        name="estimatedprice"
                        defaultValue={state?.estimatedprice}
                        hidden
                        type="number"
                    />
                </div>
                <div className='flex items-center mb-5  justify-center'>

                    <Heading
                        text="Sender's Information"
                        className="!text-center !p-0 !m-0 !text-2xl !font-black"
                    />
                    <GrCircleInformation
                        className="ml-2"
                        size={20}
                    />
                </div>
                <div className='px-2'>
                    <div className="flex items-end pb-2 justify-start gap-x-4">
                        <BsFillPersonFill
                            size={25}
                        />
                        <h1 className='text-xl  font-light '>FullName</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                    </div>

                    <InputBox
                        className="!min-h-[3rem]"
                        name="senderfullname"
                        hidden
                        defaultValue={state?.senderfullname}
                        type="text"
                    />
                </div>
                <div className='px-2'>
                    <div className="flex items-end pb-2 justify-start gap-x-4">
                        <BsCreditCard2Front
                            size={25}
                        />
                        <h1 className='text-xl  font-light '>ID Card Number</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                    </div>

                    <InputBox
                        className="!min-h-[3rem]"
                        name="senderidcardnumber"
                        hidden
                        defaultValue={state?.senderidcardnumber}
                        type="number"
                    // min="9"
                    // max="12"
                    />
                </div>
                <div className='px-2'>
                    <div className="flex items-end pb-2 justify-start gap-x-4">
                        <BsTelephoneMinus
                            size={20}
                        />
                        <h1 className='text-xl  font-light '>Phone Number</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                    </div>

                    <InputBox
                        className="!min-h-[3rem]"
                        name="senderphonenumber"
                        type="tel"
                        defaultValue={state.senderphonenumber}
                        hidden
                    // min="9"
                    // max="12"
                    />
                </div>
                <div className='flex items-center mb-5  justify-center'>

                    <Heading
                        text="Reciever's Information"
                        className="!text-center !p-0 !m-0 !text-2xl !font-black"
                    />
                    <GrCircleInformation
                        className="ml-2"
                        size={20}
                    />
                </div>
                <div className='px-2'>
                    <div className="flex items-end pb-2 justify-start gap-x-4">
                        <BsTelephoneMinus
                            size={20}
                        />
                        <h1 className='text-xl  font-light '>Full Name</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                    </div>

                    <InputBox
                        type="string"
                        className="!min-h-[3rem]"
                        name="recieverfullname"
                        defaultValue={state?.recieverfullname}
                        hidden
                    />
                </div>
                <div className='px-2'>
                    <div className="flex items-end pb-2 justify-start gap-x-4">
                        <BsTelephoneMinus
                            size={20}
                        />
                        <h1 className='text-xl  font-light '>Phone Number</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                    </div>

                    <InputBox
                        type="tel"
                        className="!min-h-[3rem]"
                        name="recieverphonenumber"
                        defaultValue={state?.recieverphonenumber}
                        hidden
                    />
                </div>

                <div className="hidden min-h-8 md:flex items-center justify-center mt-auto">
                    <LoadingButton
                        className="!w-[min(30rem,calc(100%-0.5rem))] !mx-auto !py-4 !text-lg !rounded-xl"
                    >
                        <>Prewiew <AiOutlineArrowRight size={20} className="!inline-block -rotate-45 ml-2 " /></>
                    </LoadingButton>

                </div>

                <div className="md:hidden min-h-8
           flex items-center justify-center mt-5 sticky left-0 bottom-8 w-full">
                    <LoadingButton
                        className="!w-[min(40rem,calc(100%-0.5rem))] !mx-auto !py-5 !text-lg !rounded-xl"
                    >
                        <>Preview <AiOutlineArrowRight size={20} className="!inline-block -rotate-45 ml-2 " /></>
                    </LoadingButton>


                </div>
            </form>

        </div>
    )
}

export default MailingForm