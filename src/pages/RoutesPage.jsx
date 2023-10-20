import AnimatedText from "../components/AnimateText"
import { motion } from "framer-motion"
import { useState } from "react"
import EmptyModal from './ShowBuses'
import LoadingButton from "../components/LoadingButton"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form } from "react-router-dom"
import { AiOutlinePlus } from "react-icons/ai"
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import { style } from "../utils/reactselectOptionsStyles"
import { getCities } from "../utils/ReactSelectFunction";
import { CiLocationOn } from "react-icons/ci"
import { Heading } from "../components"
import { GiPathDistance } from "react-icons/gi"
import CreatableSelect from 'react-select/creatable'
import { priceOptions } from '../utils/sortedOptions'
import { MdPriceCheck } from "react-icons/md"
import UiButton, { UiButtonDanger } from "../components/UiButton"
import customFetch from '../utils/customFetch';
import { toast } from "react-toastify"
import InputBox from "../components/InputBox"
const routesQuery = {
    queryKey: ["routes"],
    queryFn: async () => {
        const res = await customFetch.get("/routes");
        return res.data
    }
}

export const action = (queryClient) => async ({ request }) => {
    // some great logic in here
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post("/routes/new", data)
        // await queryClient.invalideQueries()
        toast.success("successfully created new route")
        return null
    } catch (err) {
        toast.error(err?.response?.data || err.message)
        return err?.response?.data || err.message
    }
}

export const loader = (queryClient) => async ({ }) => {
    //   single logic here
    return await queryClient.ensureQueryData(routesQuery)
}

const RoutesPage = () => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const { routes,
        nHits } = useQuery(routesQuery)?.data || []
    const [isOpen, setIsOpen] = useState(false)
    const DeleteRouteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await customFetch.delete("/routes/" + id);
            return res.data
        },
        // mutationKey: ["delete"]
    })
    const [selected, setSelected] = useState(null)
    return (
        <div
            className="pt-4 px-2 max-w-full overflow-x-auto select-none !flex-1
        max-h-[calc(100vh-4rem)] overflow-y-auto bg-color_light dark:bg-color_dark"
        >
            <EmptyModal
                isOpen={selected}
                setIsOpen={() => setSelected(null)}
                className2="overflow-y-auto max-h-[calc(100hv-5rem)] scrollto"
                title="Edit Route"
            >
                <Form
                    method='post'
                    className='px-4 flex flex-col gap-y-0 overflow-visible'
                >
                    <div className="flex items-center !mb-1 !mt-2 gap-x-2">
                        <CiLocationOn size={20}
                            className="text-rose-600"
                        />
                        <Heading text="From" className={"!m-0 !p-0 !text-lg first-letter:text-2xl first-letter:font-black"} />
                    </div>
                    <InputBox
                        disabled
                        className="!min-h-[3rem] disabled  disabled:!bg-gray-500"
                        name="senderfullname"
                        hidden
                        defaultValue={selected?.from}

                        type="text"
                    />

                    <div className="flex items-center !mb-1 !mt-2 gap-x-2">
                        <GiPathDistance size={20}
                            className="text-rose-600"
                        />
                        <Heading text="Destination" className={"!m-0 !p-0 !text-lg first-letter:text-2xl first-letter:font-black"} />
                    </div>
                    <InputBox
                        disabled
                        className="!min-h-[3rem] disabled  disabled:!bg-gray-500"
                        name="senderfullname"
                        hidden
                        defaultValue={selected?.to}

                        type="text"
                    />

                    <div className='px-2'>
                        <div className="flex items-end pb-2 justify-start gap-x-4">
                            {/* <MdPriceCheck
                                size={20}
                            /> */}
                            <h1 className='text-xl  font-light '>Singletrip Price</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                        </div>
                        <InputBox
                            defaultValue={selected?.singletripprice}
                            className="!min-h-[3rem] disabled  disabled:!bg-gray-500"
                            name="senderfullname"
                            hidden
                            // defaultValue={state?.senderfullname}
                            // value="from"
                            type="text"
                        />
                    </div>
                    <div className='px-2'>
                        <div className="flex items-end pb-2 justify-start gap-x-4">

                            <h1 className='text-xl  font-light '>RoundTrip Price</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                        </div>
                        <InputBox
                            className="!min-h-[3rem] disabled  disabled:!bg-gray-500"
                            name="senderfullname"
                            hidden
                            defaultValue={selected?.roundtripprice}


                            type="text"
                        />

                    </div>
                    <LoadingButton
                        className="!w-[min(30rem,calc(100%-1.5rem))] !bg-blue-900
                !mx-auto !py-3.5 !mt-10
                !text-lg "

                    >
                        Edit Route
                    </LoadingButton>

                </Form>
            </EmptyModal>


            <div className="flex items-center justify-between">
                <AnimatedText
                    text="Routes "
                    className="!text-center !text-4xl"
                />
                <motion.div onClick={() => setIsOpen(true)}
                    animate={{ scale: [0.7, 1.2, 0.8], rotate: [0, 360] }}
                    className="bottom-6 min-w-max shadow-2xl button-add px-6 top-auto text-white items-center bg-blue-400 
min-h-[2.5rem] rounded  
 lg:hidden  md:flex "
                >
                    <AiOutlinePlus size={30} color="#fff" className="" />
                    <h2>Add new Route</h2>

                </motion.div>
            </div>
            {/* table  */}

            <div
                className="lg:flex items-start justify-start flex-row-reverse w-full gap-x-5 "
            >
                <div
                    className={`
                  ${isOpen ? "visible opacity-100 pointer-events-all " : "invisible opacity-0 pointer-events-none"}
                  fixed 
                  lg:static
                  lg:opacity-100
                  lg:visible
                  lg:!pointer-events-auto
                  transition-[opacity]
                  left-1/2
                  -translate-x-1/2
                  w-[min(calc(100vw-2.5rem),30rem)]
                  lg:w-[25rem]
                  min-h-[10rem]
                  bg-white
                  dark:bg-slate-800
                  dark:shadow-sm
                  dark:shadow-dark
                  z-20
                  rounded-2xl
                  top-1/2
                  -translate-y-1/2
                  lg:translate-x-0
                  lg:translate-y-0
                  shadow-xl
                  shadow-slate-400
                  py-5 pb-10`}
                >
                    <AnimatedText
                        text="Create New Route"
                        className="!text-2xl !text-center"
                    />
                    <Form
                        method='post'
                        className='px-4 flex flex-col gap-y-3 overflow-visible'
                    >
                        <div className="flex items-center !mb-1 !mt-2 gap-x-2">
                            <CiLocationOn size={20}
                                className="text-rose-600"
                            />
                            <Heading text="From" className={"!m-0 !p-0 !text-lg first-letter:text-2xl first-letter:font-black"} />
                        </div>
                        <FromSelect
                            name="from"
                            defaultOptions
                            isSearchable={false}
                            catcheOptions
                            loadOptions={getCities}
                            required
                            styles={{
                                ...style,
                                wdith: "100%",
                                fontSize: 10 + "px"
                            }}
                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                        />
                        <div className="flex items-center !mb-1 !mt-2 gap-x-2">
                            <GiPathDistance size={20}
                                className="text-rose-600"
                            />
                            <Heading text="Destination" className={"!m-0 !p-0 !text-lg first-letter:text-2xl first-letter:font-black"} />
                        </div>
                        <ToSelect
                            name="to"
                            defaultOptions
                            isSearchable={false}
                            catcheOptions
                            loadOptions={getCities}
                            required
                            styles={{
                                ...style,
                                wdith: "100%",
                                fontSize: 10 + "px"
                            }}
                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                            className="dark:bg-slate-900 mx-2 text-black text-xs min-h-8 md:text-xl "

                        />
                        <div className='px-2'>
                            <div className="flex items-end pb-2 justify-start gap-x-4">
                                <MdPriceCheck
                                    size={20}
                                />
                                <h1 className='text-xl  font-light '>Singletrip Price</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                            </div>
                            <CreatableSelect
                                defaultValue={priceOptions[0]}
                                styles={style}
                                components={{ IndicatorSeparator: () => null }}
                                isClearable options={priceOptions}
                                name='singletripprice'
                            />

                        </div>
                        <div className='px-2'>
                            <div className="flex items-end pb-2 justify-start gap-x-4">
                                <MdPriceCheck
                                    size={20}
                                />
                                <h1 className='text-xl  font-light '>RoundTrip Price</h1> <span className='text-rose-700 text-2xl -mb-0.5'>*</span>
                            </div>
                            <CreatableSelect
                                defaultValue={priceOptions[0]}
                                styles={style}
                                components={{ IndicatorSeparator: () => null }}
                                isClearable options={priceOptions}
                                name='roundtripprice'

                            />

                        </div>
                        <LoadingButton
                            className="!w-[min(30rem,calc(100%-0.5rem))] 
                !mx-auto !py-3.5 !mt-10
                !text-lg !bg-blue-900"

                        >
                            Create New Route
                        </LoadingButton>

                    </Form>

                </div>


                <div className={`relative max-w-2xl overflow-x-auto
                    bg-white flex-1
    shadow-md sm:rounded-lg w-full-- mb-6 `}>
                    <table className="w-full text-sm text-left text-gray-500 
              dark:text-gray-400 transition-colors duration-[2s]">
                        <thead className="text-xs text-gray-700 dark:bg-slate-800 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    Index
                                </th>

                                <th scope="col" className="px-3 py-3">
                                    from
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    to
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    SingleTrip
                                </th>

                                <th scope="col" className="px-3 py-3  lg:block">
                                    RoundTrip
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        <tbody
                            className="pt-4 pb-12 text-xs md:text-sm"
                        >
                            {
                                routes?.map((route, index) => (
                                    <tr key={index}
                                        className={` ${index % 2 == 0
                                            ? "bg-slate-100" : "bg-white"}
                                        hover:bg-slate-300
                        dark:hover:bg-slate-500
                border-slate-100  text-xs
                border-b-2
                dark:bg-gray-900
                dark:border-gray-600
                
                `}
                                    >
                                        <th className="px-2 py-4  flex items-center justify-center">
                                            {

                                                (index + 1)
                                            }
                                        </th>


                                        <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {route?.from || "n/a"}
                                        </th>


                                        <td className="px-3 py-4">
                                            <span className="font-medium
                              ">{route?.to || " yaounde"}</span>
                                        </td>
                                        <td className="px-3 py-2">
                                            <span className="font-medium ">{route?.singletripprice || "787897frs"}</span>
                                        </td>
                                        <td className="px-3 py-2">
                                            <span className="font-medium ">{route?.roundtripprice || "787897frs"}</span>
                                        </td>

                                        <td className="py-0 text-xs flex items-center"
                                        >
                                            <UiButtonDanger
                                                onClick={() => DeleteRouteMutation.mutate(route?._id, {
                                                    onSuccess: () => {
                                                        toast.success("delete route")
                                                    },
                                                    onError: error => {
                                                        toast.error((error.response.data ?? "Oops something bad happen try again later !!"))
                                                    },
                                                    onSettled: () => {
                                                        queryClient.invalidateQueries({
                                                            queryKey: ["routes"]
                                                        })
                                                    }
                                                })}
                                                disabled={DeleteRouteMutation.isLoading}
                                            >
                                                Delete
                                            </UiButtonDanger>
                                            <UiButton
                                                onClick={() => setSelected(route)}
                                                className={"!bg-blue-900"}
                                            >
                                                Edit
                                            </UiButton>

                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}

export default RoutesPage