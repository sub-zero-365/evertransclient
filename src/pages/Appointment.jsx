import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Select from 'react-select';
import SelectSort from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { setTickets } from '../actions/adminData';
import { AmountCount, FormatTable, Loader, Scrollable, TicketCounts } from '../components';
import {  BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { AiOutlineSave } from 'react-icons/ai';
import { VscFolderActive } from 'react-icons/vsc';
import { BiCategory } from 'react-icons/bi';
import { MdOutlinePriceChange } from 'react-icons/md';

const Appointment = () => {
    const skip = 10;
    const [activeTicketCount, setActiveTicketCount] = useState(0);

    const [i, setI] = useState(0)
    const [j, setJ] = useState(skip)
    const next_pre = (state, tickets) => {
        if (state === 1) {
            if (!(j > tickets.length - 1)) {
                setI(j)
                setJ(j + skip);
            }
        }
        if (state == -1) {
            if (!((i - skip) < 0)) {
                setI(i - skip);
                setJ(j - skip)
            }
        }

    }
    const tickets_ = useSelector(state => state.setAdminData.tickets);
    const isLoading = useSelector(state => state.setAdminData.loading.tickets)
    // console.log(tickets_, isLoading)

    const dispatch = useDispatch();
    const setTickets_ = (payload) => {
        return dispatch(setTickets(payload))
    }
    const text = useRef(null)
    const options = [
        { label: "fullname", value: "fullname" },
        { label: "phone", value: "phone" },
        { label: "sex", value: "sex" },
        { label: "email", value: "email" },

    ]
    const [option, setOption] = useState("")
    const token = localStorage.getItem("admin_token");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseUrl = `${process.env.REACT_APP_LOCAL_URL}/admin/alltickets?${option}=${text.current.value.toLowerCase()}`
        try {
            const response = await axios.get(baseUrl, {
                headers: {
                    'Authorization': "makingmoney " + token
                }
            })
            setTickets_([...response?.data?.tickets])
        }
        catch (err) {
            console.log(err)
        }
    }
    const url = `${process.env.REACT_APP_LOCAL_URL}/admin/alltickets`
    const sortOpions = [
        { label: "all", value: "null" },
        { label: "today", value: 1 },
        { label: "yesterday", value: 2 },
        { label: "last week", value: 7 },
        { label: "last month", value: 31 },
    
      ]
    useEffect(() => {
        try {
            async function fetchData() {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                })
                setTickets_([...response?.data?.tickets])
                const acttic = response?.data?.tickets.filter((arr) => arr.active).length
                setActiveTicketCount(acttic)
            }
            fetchData()
        } catch (err) {
            console.log(err);
        }
    }, [])


    return (
        <div className="max-w-full h-[calc(100vh-3rem)] overflow-auto" >

            {isLoading && (<Loader toggle dark />)}

            <div className=" md:flex  justify-between items-start">
                <h1 className='text-2xl text-center mt-6'>Book tickets</h1>
                <div className="flex flex-col mx-auto justify-center  items-center">
                    <h2 className='uppercase text-lg md:text-lg mb-4'>Filter Data By</h2>
                    <SelectSort className='!w-[20rem] !border-none !outline-none'
                        options={sortOpions} />
                </div>


            </div>

            <Scrollable className={"!px-5"}>
                <TicketCounts counts={tickets_.length}
                    total
                    icon={<AiOutlineSave />} />
                <TicketCounts counts={activeTicketCount}
                    active
                    icon={<VscFolderActive />} />
                <TicketCounts
                    inactive
                    counts={tickets_.length - activeTicketCount} icon={<BiCategory />} />
            </Scrollable>
            <Scrollable className={"!px-5"}>
                <AmountCount
                    className="!bg-blue-400"

                    total
                    icon={<MdOutlinePriceChange />}
                    amount={tickets_.length * 6500} />
                <AmountCount
                    className="!bg-green-400"

                    active
                    icon={<BiCategory />} amount={activeTicketCount * 6500} />
                <AmountCount
                    className="!bg-red-400 !text-black"

                    inactive
                    icon={<BiCategory />} amount={(tickets_.length - activeTicketCount) * 6500} />
            </Scrollable>

            <form className="px-4 md:px-3 my-5 " onSubmit={handleSubmit}>
                <div className="flex relative min-h-[40px]">
                    <Select options={options} onChange={e => setOption(e.value)} required />
                    <div className="relative w-full">
                        <input type="search" ref={text} id="search-dropdown" className="block outline-none focus:outline-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Email address ,phone number,names etc " required />
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>



            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                Index
                            </th>
                            <th scope="col" className="px-3 py-3">
                                full name
                            </th>
                            <th scope="col" className="px-3 py-3">
                                phone
                            </th>
                            <th scope="col" className="px-3 py-3">
                                price
                            </th>
                            <th scope="col" className="px-3 py-3">
                                from
                            </th>
                            <th scope="col" className="px-3 py-3">
                                to
                            </th>
                            <th scope="col" className="px-3 py-3">
                                date
                            </th>
                            <th scope="col" className="px-3 py-3">
                                time
                            </th>
                            <th scope="col" className="px-3 py-3">
                                age
                            </th>
                            <th scope="col" className="px-3 py-3">
                                sex
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <FormatTable tickets={tickets_} j={j} i={i} />
                </table>
            </div>
            <div className="flex mb-10 select-none gap-4 mt-5 ml-4">
                <div className={`${i <= 0 ? "opacity-40" : "opacity-100"} w-10 text-lg rounded-lg  h-10 shadow bg-lime-50 hover:bg-slate-300 duration-300 transition-all grid place-items-center `} onClick={() => next_pre(-1, tickets_)}>
                    <BsChevronLeft className='text-black  font-black' />

                </div>
                <div className={`${j >= tickets_.length ? "opacity-40" : "opacity-100"} w-10 text-lg rounded-lg  h-10 shadow bg-lime-50 hover:bg-slate-300 duration-300 transition-all grid place-items-center `} onClick={() => {
                    next_pre(1, tickets_)
                }}>
                    <BsChevronRight className='text-black  font-black' />

                </div>


            </div>

        </div>
    )

}

export default Appointment