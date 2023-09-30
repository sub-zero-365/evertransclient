// import { style } from "../utils/reactselectOptionsStyles"
import LoadingButton from '../components/LoadingButton'
import { CiLocationOn } from "react-icons/ci"
import { WiTime4 } from "react-icons/wi"
import { GiPathDistance } from "react-icons/gi"
import { RiDeleteBin6Line } from "react-icons/ri"
import InputBox from "../components/InputBox"
import { getCities } from "../utils/ReactSelectFunction";
import { useNavigate, useSearchParams, Link, useNavigation } from "react-router-dom"
import {
    Heading,
} from "../components"
import { useState, forwardRef, useRef } from "react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineArrowRight } from 'react-icons/ai'
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import TimeSelect from 'react-select'
import { timeOptions } from '../utils/sortedOptions'
import { useMailingContext } from "../pages/Mailing"
import { toast } from "react-toastify"
import { BsCreditCard2Front, BsFillPersonFill, BsTelephoneMinus } from 'react-icons/bs'
import { GrCircleInformation } from 'react-icons/gr'
const MailingForm = () => {
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
        // imgArr.forEach((file, index) => {
        //     formdata.append("file.name" + index, file, file.name)
        // });
        const data = Object.fromEntries(formdata)
        const { from, to } = data
        if (from == to) return toast.error("cities should not be thesame!")
        console.log("this i sthe source data here", data)

        navigate(`preview`, {
            state: {
                ...data,
                imgArr
            }
        })
    }
    const [startDate, setStartDate] = useState(new Date());


    const {
        deleteImg, imgArr, setImgUrl } = useMailingContext()


    const handleFileChange = () => {
        const files = fileRef.current.files
        if (imgArr && imgArr.length > 3) {
            toast.warning("you can add just 4 photos")
            return
        }
        const temp = []
        for (let file of files) {
            console.log(`this is a file at any time`, file)
            // const file = fileRef.current.files[0]
            temp.push(file)
            // if (!file) return
        }
        setImgUrl([
            ...imgArr, ...temp
        ])

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
                        multiple
                    />
                    <label htmlFor="file">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAVXZhlM-qA4bg_bOHRutl3wQVQdAbSWx_A&usqp=CAU'
                            alt="inputimage"
                        />
                    </label>
                    <div className=''>
                        {/* <AnimatePresence> */}

                        {
                            imgArr.map((img, index) =>
                                <>
                                    <div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.4 }}
                                        key={`${img?.name}--${img?.size}`}
                                        className='flex px-4 py-4
                                justify-between 
                                mb-3 items-center 
                                gap-x-2 border rounded-lg bg-slate-50'
                                    >
                                        <img
                                            className='flex-none w-16 h-14'
                                            src={URL.createObjectURL(img)}
                                        />
                                        <div classNamme="flex-1  overflow-hidden ">
                                            <Heading
                                                className="!text-sm line-clamp-1 !text-start"
                                                text={img?.name
                                                }
                                            />
                                            <Heading
                                                className="!text-sm line-clamp-1 !text-start"
                                                text={`${(img?.size / 1024).toFixed(1)} kb`
                                                }
                                            />
                                        </div>
                                        <div
                                            className='flex-none'
                                        >
                                            <RiDeleteBin6Line
                                                className='cursor-pointer'
                                                onClick={() => deleteImg(index)}
                                                size={25}
                                            />
                                        </div>
                                    </div>
                                </>

                            )
                        }

                        {/* </AnimatePresence> */}

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
                        name='date'
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
                        name="fullname"
                        hidden
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
                        hidden
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
                        <h1 className='text-xl  font-light '>Phone Number</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                    </div>

                    <InputBox
                        className="!min-h-[3rem]"
                        name="recieverphonenumber"
                        hidden
                    />
                </div>

                <div className="hidden min-h-8 md:flex items-center justify-center mt-auto">
                    <LoadingButton
                        className="!w-[min(30rem,calc(100%-1.5rem))] !mx-auto !py-3.5 !text-lg !rounded-xl"
                    >
                        <>Prewiew <AiOutlineArrowRight size={20} className="!inline-block -rotate-45 ml-2 " /></>
                    </LoadingButton>

                </div>

                <div className="md:hidden min-h-8
           flex items-center justify-center mt-5 sticky left-0 bottom-8 w-full">
                    <LoadingButton
                        className="!w-[min(30rem,calc(100%-0.5rem))] !mx-auto !py-4 !text-lg !rounded-xl"
                    >
                        <>Preview <AiOutlineArrowRight size={20} className="!inline-block -rotate-45 ml-2 " /></>
                    </LoadingButton>


                </div>
            </form>

        </div>
    )
}

export default MailingForm