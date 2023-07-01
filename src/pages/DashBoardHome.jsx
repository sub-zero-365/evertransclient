import { DashItem, Button, Heading, FormatTable } from '../components'
// import { GrStackOverflow } from 'react-icons/gr'
// import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
// import { storeCities } from "../actions/userCity"
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux';
import { setTicketData } from '../actions/adminData';
import { BsTicketPerforated } from 'react-icons/bs'
import { BiBus } from 'react-icons/bi'
import { useState, useEffect, useRef } from 'react'
import axios from "axios"
function renderEmployees() {

    return (
        <div className=''>
            coding this user section for later dates

        </div>
    )
}
const DashboardHome = () => {

    const token = localStorage.getItem("admin_token");
    const ticketData = useSelector(state => state.setAdminData.ticketdata);
    const cities = useSelector(state => state.userCity.cities);
    const dispatch = useDispatch();
    const setTicketDataFunction = (payload) => {
        return dispatch(setTicketData(payload))
    }

    useEffect(() => {
        (async function () {
            const url = `${process.env.REACT_APP_LOCAL_URL}/admin/alltickets`
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    },
                    params: { limit: 20 }
                })
                setTicketDataFunction({ ...response?.data })
            } catch (err) {
                console.log(err);
            }
        }())
    }, [])

    return (
        <div className="w-full pt-6 pb-24 max-h-[calc(100vh-3rem)] overflow-y-auto">
            <Heading text="OverFlow" className="!font-black underline underline-offset-8 uppercase" />
            <div className="lg:grid gap-4 lg:grid-cols-3 px-4">
                <DashItem Name={"Employees"}
                    href={"users"}
                    Counts={23}
                    icon={<BsTicketPerforated className='text-3xl' />} />
                <DashItem Name={"Tickets"}
                    href={"tickets"}
                    Counts={ticketData.totalTickets}
                    icon={<BsTicketPerforated className='text-3xl' />} />
                <DashItem Name={"Buses"}
                    href={"buses/23"}
                    Counts={23}
                    icon={<BiBus className='text-3xl' />} />
                <DashItem Name={"Cities"}
                    href={"cities"}
                    Counts={23}
                    icon={<BiBus className='text-3xl' />} />

            </div>
            <Heading text="Price Stats" className="!font-black first-letter:!text-4xl !text-xl underline underline-offset-8 uppercase" />
            <div className="flex items-center justify-center   text-gray-800 p-10 pt-0 bg-gray-200--">
	<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-6xl">
		<div className="flex items-center p-4 bg-white rounded">
			<div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
				<svg className="w-6 h-6 fill-current text-green-700"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				  <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
				</svg>
			</div>
			<div className="flex-grow flex flex-col ml-4">
				<span className="text-xl font-bold">$8,430</span>
				<div className="flex items-center justify-between">
					<span className="text-gray-500">Revenue last 30 days</span>
					<span className="text-green-500 text-sm font-semibold ml-2">+12.6%</span>
				</div>
			</div>
		</div>
		
		<div className="flex items-center p-4 bg-white rounded">
			<div className="flex flex-shrink-0 items-center justify-center bg-red-200 h-16 w-16 rounded">
				<svg className="w-6 h-6 fill-current text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				  <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
				</svg>
			</div>
			<div className="flex-grow flex flex-col ml-4">
				<span className="text-xl font-bold">211</span>
				<div className="flex items-center justify-between">
					<span className="text-gray-500">Sales last 30 days</span>
					<span className="text-red-500 text-sm font-semibold ml-2">-8.1%</span>
				</div>
			</div>
		</div>
		
		<div className="flex items-center p-4 bg-white rounded">
			<div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
				<svg className="w-6 h-6 fill-current text-green-700"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				  <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
				</svg>
			</div>
			<div className="flex-grow flex flex-col ml-4">
				<span className="text-xl font-bold">140</span>
				<div className="flex items-center justify-between">
					<span className="text-gray-500">Customers last 30 days</span>
					<span className="text-green-500 text-sm font-semibold ml-2">+28.4%</span>
				</div>
			</div>
		</div>
		
	</div>

</div>
            <Heading text="Recent Book Tickets" className="!font-black first-letter:!text-4xl !text-xl underline underline-offset-8 uppercase" />

            <div className="relative overflow-x-auto shadow-md bg-white sm:rounded-lg w-full mb-6 ">
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
                                from
                            </th>
                            <th scope="col" className="px-3 py-3">
                                to
                            </th>
                            <th scope="col" className="px-3 py-3">
                                date
                            </th>
                            <th scope="col" className="px-3 py-3">
                                createdat
                            </th>
                            <th scope="col" className="px-3 py-3">
                                type
                            </th>
                            <th scope="col" className="px-3 py-3">
                                status
                            </th>
                            <th scope="col" className="px-3 py-3">
                                price
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <FormatTable tickets={ticketData.tickets} admin />

                </table>
            </div>
            <div className="md:grid grid-cols-12 items-start space-y-5 gap-x-6 container mx-auto px-5 md:px-14">

                <div class="w-full  p-4 col-span-6 lg:col-span-8 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <Heading text="Recent Employees" className="!font-black first-letter:!text-4xl !text-xl underline underline-offset-8 uppercase" />

                    
<section class="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 ">
    <div class="h-">
        <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm ">
         
            <div class="p-0">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Name</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Email</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Prices</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">action</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                            <tr>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" width="40" height="40" alt="Alex Shatov"/></div>
                                        <div class="font-medium text-gray-800">Alex Shatov</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">alexshatov@gmail.com</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium text-green-500">$2,890.66</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-lg text-center">🇺🇸</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg" width="40" height="40" alt="Philip Harbach"/></div>
                                        <div class="font-medium text-gray-800">Philip Harbach</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">philip.h@gmail.com</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium text-green-500">$2,767.04</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-lg text-center">🇩🇪</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg" width="40" height="40" alt="Mirko Fisuk"/></div>
                                        <div class="font-medium text-gray-800">Mirko Fisuk</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">mirkofisuk@gmail.com</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium text-green-500">$2,996.00</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-lg text-center">🇫🇷</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-08.jpg" width="40" height="40" alt="Olga Semklo"/></div>
                                        <div class="font-medium text-gray-800">Olga Semklo</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">olga.s@cool.design</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium text-green-500">$1,220.66</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-lg text-center">🇮🇹</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg" width="40" height="40" alt="Burak Long"/></div>
                                        <div class="font-medium text-gray-800">Burak Long</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">longburak@gmail.com</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium text-green-500">$1,890.66</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-lg text-center">🇬🇧</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

<div x-show="open" class="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60" x-data="{ open: true }">
    <div class="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
        <div>👉 <a class="hover:underline ml-1" href="https://cruip.com/?ref=codepen-cruip-customers-table" target="_blank">More components on Cruip.com</a></div>
        <button class="text-gray-500 hover:text-gray-400 ml-5" >
            <span class="sr-only">Close</span>
            <svg class="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 16 16">
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
            </svg>
        </button>
    </div>
</div>
                </div>
                <div class="w-full col-span-6 lg:col-span-4  p-4 pt-0 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <Heading text="Recent  Cities" className="!font-black !text-xl first-letter:!text-4xl underline underline-offset-8 uppercase" />

                    {
                        cities.map((item, index) => (

                            <motion.div
                                key={index}

                                className='flex gap-4 justify-between px-5 max-w-4xl mb-4 pb-1 items-center border-b-2' >
                                <div>
                                    {index + 1}
                                </div>
                                <div className='flex-1  justify-between flex'>
                                    <h1>{item.value} </h1>

                                </div>
                            </motion.div>
                        ))
                    }

                </div>
            </div>


        </div>
    )

}
export default DashboardHome