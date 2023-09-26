import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heading } from '../components'
import { useEffect, useState, useRef } from 'react';
import {  useLoaderData, Form, useNavigation, redirect } from 'react-router-dom'
import formatQuery from "../utils/formatQueryStringParams"
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

import UiButton, { UiButtonDanger } from '../components/UiButton';
import AnimatedText from '../components/AnimateText';
import { useQuery } from "@tanstack/react-query"
import customFetch from '../utils/customFetch'
const singleBusQuery = (id) => {
    return ({
        queryKey: ["bus", id],
        queryFn: async () => {
            const res = await customFetch.get(`/bus/${id}`)
            return res.data
        }
    })
}

export const action = (queryClient) => async ({ request }) => {
    try {
        const form = await request.formData()
        const  id  = form.get("id")
        await customFetch.delete("/bus/" + id)
        queryClient.invalidateQueries({
            queryKey: ["buses"]
        })
        return redirect("/bus")
    }
    catch (err) {
        console.log(err)
        toast.warning("something went wrong try again")
        return err
    }

}

export const loader = (queryClient) => async ({ params }) => {
    try {
        await queryClient.ensureQueryData(singleBusQuery(params.id))
        return params.id
    } catch (err) {
        throw err
    }
}

const BusDetails = () => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"
    const id = useLoaderData()
    const [isOpen, setIsOpen] = useState(false);
    const { bus } = useQuery(singleBusQuery(id)).data ?? {}
    const [text, setText] = useState("")
   

    return (
        <div className='!flex-1 h-[calc(100vh-60px)] container mx-auto overflow-y-auto pb-24'>
            <nav class="flex mb-5 mt-5 px-5 " aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <Link
                            relative="path"
                            to={"../"}
                            href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            bus
                        </Link>
                    </li>
                    <li>
                        <div class="flex items-center" >
                            <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Bus Details</h1>
                            </a>
                        </div>
                    </li>

                </ol>
            </nav>
            <div
                className={`overlay ${isOpen && "active"} transition-[visible] duration-100
      group grid place-items-center `}
                onClick={() => setIsOpen(false)}
            >
                <div
                    onClick={e => e.stopPropagation()}
                    className={`
          -translate-x-[50px]
          md:translate-x-0
          md:translate-y-[50px]
          group-[.active]:translate-x-0
          duration-700
          ease 
          transition-all
          opacity-60
          md:group-[.active]:translate-y-0
          group-[.active]:opacity-100
          bg-white
          dark:bg-slate-800
          shadow-sm
          rounded-lg
          w-[min(calc(100%-40px),400px)]
          
            py-5 pb-10`}>

                    <AnimatedText text="Delete Bus !!"
                        className='!mb-1 !text-lg !text-rose-600 !text-center capitalize' />
                    <p className="text-lsm !font-montserrat !text-center mb-6">Enter Bus name to delete Bus: <span className="!text-sm !text-rose-600">{bus?.name}</span></p>
                    <Form
                        method="post"
                        className='px-5'
                    >

                        <div className="relative mb-6" data-te-input-wrapper-init>

                            <input
                                type="hidden"
                                name="id"
                                value={id}
                            />
                            <input
                                value={text}
                                onChange={e => setText(e.target.value)}
                                type="text"
                                className="peer block min-h-[auto] w-full 
              rounded 
              border-2
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent
              px-3 py-[0.32rem]
              leading-[2.15] 
              outline-none
              transition-all 
              duration-200
              ease-linear
              focus:placeholder:opacity-100
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="text"
                                placeholder="text" required />
                            <label
                                htmlFor="text"
                                className="pointer-events-none 
              absolute left-3
              top-0 mb-0
              max-w-[90%]
              origin-[0_0]
              truncate 
              pt-[0.37rem] 
              leading-[2.15]
              text-neutral-500
              transition-all duration-200  
              ease-out 
              peer-focus:-translate-y-[1.15rem]
              peer-focus:scale-[0.8]
              peer-valid:scale-[0.8]
              peer-valid:text-blue-400
              peer-valid:-translate-y-[1.15rem]
              peer-focus:text-blue-400
              peer-focus:bg-white
              peer-valid:bg-white
              dark:peer-focus:bg-color_dark
              dark:peer-valid:bg-color_dark
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"

                            >
                                Enter Bus Name
                            </label>
                        </div>
                        {
                            isSubmitting ? <UiButton
                                type="button"
                                name="loading please wait"
                            /> : <UiButtonDanger
                                disabled={
                                    (text !== bus?.name)
                                }
                                type="submit"
                                name="DELETE BUS" className="" />
                        }




                    </Form>
                </div>
            </div>
            <AnimatedText text={"Bus Details "} className='!text-3xl !text-center lg:!text-4xl w-full' />
            <div className='flex flex-col lg:flex-row justify-center w-full'>
                <div className='mb-10 '>
                    <Heading text={"Properties"} className={"!font-black"} />
                    <div className='lg:w-[40rem] space-y-4'>
                        <div className="flex px-4 justify-between items-center  flex-wrap pb-0.5 dark:border-slate-400 border-b-2">
                            <Heading text={"Name "} className={"!font-black !pl-0 !mb-0  "} />
                            <p>{bus?.name || "n/a"}</p>
                        </div>
                        <div className="flex px-4 justify-between items-center  flex-wrap pb-0.5 dark:border-slate-400 border-b-2">
                            <Heading text={"Capacity"} className={"!font-black !pl-0 !mb-0  "} />
                            <p>{bus?.number_of_seats || "n/a"}</p>
                        </div>
                        <div className="flex px-4 justify-between items-center  flex-wrap pb-0.5 dark:border-slate-400 border-b-2">
                            <Heading text={"Plate Number"} className={"!font-black !pl-0 !mb-0  "} />
                            <p>{bus?.plate_number || "n/a"}</p>
                        </div>
                        <div className="flex px-4 justify-between items-center  flex-wrap pb-0.5 dark:border-slate-400 border-b-2">
                            <Heading text={"Trip Completed"} className={"!font-black !pl-0 !mb-0  "} />
                            <p>{bus?.seats || "n/a"}</p>
                        </div>

                    </div>
                    <div className='grid place-items-center mt-3 '>
                        <Heading text={"Caution!!!"}
                            className={"!mb-2 !pl-0"} />
                        <UiButtonDanger
                            name={"Delete Bus"}
                            onClick={() => setIsOpen(true)}
                            className={"!scroll-px-10 !px-12"} />
                    </div>
                </div>
                {/* <div className='lg:w-full mx-4 mb-10 shadow pb-10 lg:mr-5  bg-white dark:bg-slate-900 py-7 rounded-sm px-6'>
                    <div className="flex items-center">
                        <Heading text={"Bus Setting"} className={"!font-black mr-1 !mb-1"} />
                        <BsSliders2Vertical size={20} />
                    </div>
                    <div className='px-5'>
                        <div className="flex 
                        items-center
                        gap-x-4 mb-4">
                            <Heading text={"Edit Bus Name"}
                                className={"!font-medium !text-lg lg:text-xl mr-1  !mb-0 !mt-2"} />
                            <ToggleSwitch
                                state={togglename}
                                initialMessage={"-"}
                                onChange={() => setToggleName(!togglename)} />
                        </div>

                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                disabled={togglename}
                                type="text"
                                className={`peer block min-h-[auto] w-full 
                                ${togglename && "!bg-slate-200 dark:!bg-slate-950 !text-slate-700"}
              rounded 
              border-2
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent
              px-3 py-[0.32rem]
              leading-[2.15] 
              outline-none
              transition-all 
              duration-200
              ease-linear
              focus:placeholder:opacity-100
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                id="exampleFormControlInput3"
                                placeholder="Phone Number" required />
                            <label
                                htmlFor="exampleFormControlInput3"
                                className="pointer-events-none 
              absolute left-3
              top-0 mb-0
              max-w-[90%]
              origin-[0_0]
              truncate 
              pt-[0.37rem] 
              leading-[2.15]
              text-neutral-500
              transition-all duration-200  
              ease-out 
              peer-focus:-translate-y-[1.15rem]
              peer-focus:scale-[0.8]
              peer-valid:scale-[0.8]
              peer-valid:text-blue-400
              peer-valid:-translate-y-[1.15rem]
              peer-focus:text-blue-400
              peer-focus:bg-color_light
              peer-valid:bg-color_light
              dark:peer-focus:bg-color_dark
              dark:peer-valid:bg-color_dark
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"

                            >Phone Number
                            </label>
                        </div>
                            <div className='flex flex-col space-y-2  items-start'>
                                <Heading text={"Edit Plate Number"}
                                    className={"!font-medium !text-sm mr-1 !pl-0  !mb-0 !mt-2"} />
                                <div className="relative mb-6 pt-2" data-te-input-wrapper-init>
                                    <input
                                        type="text"
                                        className={`peer block min-h-[auto] w-full 
              rounded 
              border-2
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent
              px-3 py-[0.32rem]
              leading-[2.15] 
              outline-none
              transition-all 
              duration-200
              ease-linear
              focus:placeholder:opacity-100
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                        id="exampleFormControlInput3"
                                        placeholder="Phone Number" required />

                                </div>
                            </div>
                    </div>
                    <UiButton
                        name={"Submit !"}
                        className={"!block !text-lg !mx-auto  !mt-10 lg:!mt-20 !py-1 pb-1.5 !w-[min(calc(100%-40px),400px)]"} />
                </div> */}

            </div>

        </div>
    )
}

export default BusDetails