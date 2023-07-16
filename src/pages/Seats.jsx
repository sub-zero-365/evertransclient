import CustomDatePicker from '../components/CustomDatePicker'
import { Scrollable, TicketCounts } from "../components"
import { AiOutlineSave } from "react-icons/ai"
import { VscFolderActive } from 'react-icons/vsc'
import UiButton, { UiButtonDanger } from "../components/UiButton"
import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Heading, ToggleSwitch } from '../components'
import { useSearchParams } from 'react-router-dom'
import { sortedDateOptions, sortTicketStatusOptions, skipOptions, timeOptions } from "../utils/sortedOptions"
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import TimeSelect from "react-select"
import { getCities } from "../utils/ReactSelectFunction"
import { components, style } from "../utils/reactselectOptionsStyles"
import DatePicker from 'react-datepicker';

const Seats = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        // console.log(dates)
    };
    const [querySearch, setQuerySearch] = useSearchParams();


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
    const [inline, setInline] = useState(false);
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const getData = async () => {
        try {
            const res = await axios.get("/seat", {})
            console.log(res.data)
            setData(res.data)
        } catch (err) {
            console.log("err", err)
        } finally {
            console.log("done!")
        }



    }
    useEffect(() => {
        getData()
    }, [
    ])
    // const [innWidth, setInnerWidth] = useState(null)
   

    window.onresize = function (e) {
        if (window.innerWidth <= 760) {
            setInline(false)
            // code here 
            return
        }
        setInline(true)

    }



    return (
        <div className="h-[calc(100vh-60px)] !flex-1 w-full overflow-y-auto">
            <div className="flex  flex-col lg:flex-row  lg:mt-10 lg:px-8 max-w-full rounded-sm shadow-sm lg:mx-10
            py-10 items-start justify-between bg-white lg:mb-14">

                <div className="flex-1  w-full px-2 lg:px-0 ">
                    <Scrollable className={`!px-5 !mb-10 !grid !grid-cols-1
                    !transition-all !duration-[1s]`}>
                        <TicketCounts counts={0 || 0 === 0 && "0" || <span className='text-xs font-black '>loading ...</span>}
                            text={"Total Routes"}
                            icon={<AiOutlineSave />} />
                        <TicketCounts counts={0 || 0 === 0 && "0" || <span className='text-xs font-black '>loading ...</span>}
                            text={"Total Seats"}
                            icon={<VscFolderActive />}
                        />
                        <TicketCounts
                            text={"Inactive Tickets"}
                            counts={0 || 0 === 0 && "0" || <span className='text-xs font-black '>loading ...</span>} />
                    </Scrollable>
                </div>
                <div className="flex-none w-full lg:w-[15rem] ">
                    <Scrollable className="!overflow-visible !gap-x-4 !items-start !flex-wrap
                        !justify-center !gap-y-5 md:!justify-center">

                        <div className="flex-none">
                            <Heading text={"From"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />

                            <FromSelect
                                defaultOptions
                                catcheOptions
                                loadOptions={getCities}
                                required
                                styles={{
                                    ...style,
                                    wdith: "100%",
                                    fontSize: 10 + "px"
                                }}
                                components={components()}
                                className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                            // onChange={evt => setFromCities(evt.value)}
                            />
                        </div>
                        <div className="flex-none">
                            <Heading text={"Destination"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />

                            <ToSelect
                                defaultOptions
                                catcheOptions
                                loadOptions={getCities}
                                required
                                styles={{
                                    ...style,
                                    wdith: "100%",
                                    fontSize: 10 + "px"
                                }}
                                components={components()}
                                className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                            // onChange={evt => setFromCities(evt.value)}
                            />
                        </div>
                        <div className="flex-none">
                            <Heading text={"Time"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />

                            <TimeSelect
                                isSearchable={false}
                                options={timeOptions}
                                styles={{
                                    ...style,
                                    wdith: "100%",
                                    fontSize: 10 + "px"
                                }}
                                components={components()}
                                className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                            // onChange={evt => setFromCities(evt.value)}
                            />
                        </div>
                    </Scrollable>

                </div>
                <div className="flex-none flex flex-col items-center w-full  lg:w-fit hidden- lg:block flex-end px-5 ">
                    <DatePicker
                        wrapperClassName="!w-full !bg-orange !border-none !outline-none "
                        className="!w-full  !mt-5 min-h-[2rem] !mx-auto  !border-2 !text-center   !outline-none "
                        containerClassName="!w-full !border-none !outline-none !shadow-none"
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline={inline && true}
                        containerStyle={{
                            width: "100%"
                        }}

                    // maxDate={new Date()}
                    />
                    <UiButton onClick={() => 0} name="query" className="!mx-auto !block !mt-1 lg:px-10" />
                </div>
            </div>
            <section class=" antialiased bg-gray-100 text-gray-600 ">
                <div class="h-">
                    <div class="w-full max-w-2xl-- mx-auto bg-white shadow-lg rounded-sm ">

                        <div class="p-0">
                            <div class="overflow-x-auto">
                                <table class="table-auto w-full">
                                    <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th class="p-2 whitespace-nowrap">
                                                <div class="font-semibold text-left">index</div>
                                            </th>
                                            <th class="p-2 whitespace-nowrap">
                                                <div class="font-semibold text-left">From</div>
                                            </th>
                                            <th class="p-2 whitespace-nowrap">
                                                <div class="font-semibold text-left">Destination</div>
                                            </th>
                                            <th class="p-2 whitespace-nowrap">
                                                <div class="font-semibold text-left">Departure Date</div>
                                            </th>
                                            <th class="p-2 whitespace-nowrap">
                                                <div class="font-semibold text-left">Time</div>
                                            </th>
                                            <th class="p-2 whitespace-nowrap">
                                                <div class="font-semibold text-left">Bus</div>
                                            </th>

                                            <th class="p-2 whitespace-nowrap">
                                                <div class="font-semibold text-center">actions</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-sm divide-y divide-gray-100">
                                        {

                                            data?.seats?.map(({ from,
                                                to,
                                                bus,
                                                traveldate,
                                                traveltime,
                                                _id
                                            }, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-left pl-1">{(index + 1) || "n/a"}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-left">{from || "n/a"}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-left font-medium text-green-500">{to}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-left font-medium text-green-500">{traveldate}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-left font-medium text-green-500">{traveltime}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-left font-medium text-green-500">{bus?.bus || "n/a"}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap flex ">
                                                            <UiButton onClick={() => navigate(`${_id}`)} name="details" />
                                                        </td>
                                                    </tr>

                                                )
                                            })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Seats