import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { useLoaderData, redirect, Form, Link } from "react-router-dom";
import AnimatedText from "../components/AnimateText";
import { useState } from "react";
import { getBuses, getCities } from "../utils/ReactSelectFunction";
import BusSelect from 'react-select/async'
import { Heading, Scrollable } from "../components";
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import UiButton from "../components/UiButton";
// import React from 'react'
import { toast } from "react-toastify"
import { style, components } from "../utils/reactselectOptionsStyles"
import LoadingButton from "../components/LoadingButton";
import BusCard from "../components/BusCard";
import dayjs from "dayjs";
import { MdOutlineClose } from "react-icons/md";

const busQuery = params => ({
    queryKey: ["buses", { params }],
    queryFn: async () => {
        const { data } = await customFetch.get('/seat/getstatic', {
            params: {
                ...params
            },
        });
        return data;
    },

})
export const action = (queryClient) => async ({ request }) => {
    // const params = Object.fromEntries([
    //     ...new URL(request.url).searchParams.entries(),
    // ]);
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    // data.date
    try {
        await customFetch.post('/seat', data);
        queryClient.invalidateQueries(['seats']);
        toast.success('Job added successfully ');
        return redirect("/seat")
    } catch (err) {
        toast.error(err?.response?.data || err.message || "something went wrong")
        return err?.response?.data || err.message
        // return redirect("/?something went wrong !!!")
    }
}
export const loader = (queryClient) => async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    // params.time = params.traveltime
    // params.date = params.traveldate
    // delete params.traveltime
    // delete params.traveldate
    await queryClient.ensureQueryData(busQuery(params));
    return { searchValues: { ...params } }
}
const AddNewBusPage = () => {
    const { searchValues } = useLoaderData()
    const { seats,
        nHits
    } = useQuery(busQuery(searchValues)).data
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className="max-w-7xl mx-auto py-10"
        >
            <AnimatedText
                text={`Available Buses for ${searchValues.date}`}
                className="!text-4xl lg:!text-6xl"
            />
            <UiButton
                onClick={() => setIsOpen(true)}
                className="lg:hidden !w-[min(400px,calc(100%-1rem))] !mx-auto line-clamp-1 !py-4 !my-10"
            >
                Add New Seat
            </UiButton>
            {/* {JSON.stringify(seats)} */}



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
                    <span
                        className='absolute lg:hidden
                    w-8 h-8  hover:ring-red-500
           
            md:h-10 md:w-10 rounded-full
            grid place-items-center
            text-xs
            hover:shadow-xl
            mx-4
            mt-2
            bg-slate-100
            hover:bg-red-400
            ease duration-500
            transition-colors
            right-0 top-0 '
                        onClick={() => setIsOpen(false)}
                    >
                        <MdOutlineClose
                            classNae="text-sm" />
                    </span>
                    <Form method="post">
                        <AnimatedText
                            text="Add A New Bus"
                            className="!text-2xl !text-center"
                        />
                        <Scrollable className="!overflow-visible !flex-col !justify-center !items-center">
                            <div>
                                <Heading text="From " className={"!mb-1 !mt-2 !text-lg first-letter:font-black"} />
                                <FromSelect
                                    name="from"

                                    menuPlacement='top'
                                    defaultOptions
                                    catcheOptions
                                    loadOptions={getCities}
                                    required

                                    styles={{
                                        ...style,
                                        wdith: "100%",
                                        fontSize: 10 + "px"
                                    }}

                                    // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                                    className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                                // onChange={evt => setFromCities(evt.value)}
                                />

                            </div>
                            <div>
                                <Heading text="To" className={"!mb-1 !mt-2 !text-lg first-letter:font-black"} />
                                <ToSelect
                                    name="to"
                                    //   onChange={(e) => {
                                    //     setQueryObj(
                                    //       (prev) => {
                                    //         return ({
                                    //           ...prev, to: e.value

                                    //         })
                                    //       }
                                    //     )
                                    //   }}
                                    defaultOptions
                                    catcheOptions
                                    loadOptions={getCities}
                                    required

                                    styles={{
                                        ...style,
                                        wdith: "100%",
                                        fontSize: 10 + "px"
                                    }}

                                    // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                                    className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                                />

                            </div>


                        </Scrollable>
                        <input
                            type="hidden"
                            name="traveldate"
                            value={searchValues?.date}
                        />
                        <div className='mx-auto mt-6 mb-6 w-[min(300px,calc(100%-2.5rem))]'>
                            <BusSelect
                                name="bus_id"
                                defaultOptions
                                catcheOptions
                                loadOptions={
                                    async () => {

                                        const data = await getBuses()
                                        const formateddata = data?.map(({ label, value, feature, number_of_seats }) => {
                                            return ({
                                                label: `Name : ${label}----Number_Of_Seats: ${number_of_seats}`,
                                                value: value,
                                            })

                                        })
                                        return formateddata

                                    }

                                }
                                required
                                isSearchable={false}
                                //   onChange={(e) => {
                                //     setSelectedIds((pre) => {
                                //       return ({
                                //         ...pre,
                                //         bus_id: e.value

                                //       })

                                //     })
                                //   }}

                                className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                            />


                        </div>
                        <LoadingButton
                            className="!w-[min(400px,calc(100%-1rem))] !mx-auto line-clamp-1 !py-4 !-mb-4"

                        >
                            Add New Seat
                        </LoadingButton>
                    </Form>

                </div>


                <div className={`relative max-w-2xl overflow-x-auto
                    bg-white flex-1
    shadow-md sm:rounded-lg w-full-- mb-6 py-10 `}>
                    {
                        seats?.length > 0 ?
                            <div
                                className="lg:px-24 px-8 justify-center gap-x-4 grid grid-cols-[repeat(auto-fit,minmax(min(calc(100%-20px),25rem),1fr))]"
                            >
                                {
                                    seats?.map(({ seat_positions
                                        , bus: { bus }, from, to, number_of_seats, _id }) =>

                                        <div className="border p-4 mb-2">


                                            <h2 className='font-black !text-2xl capitalize leading-9 px-5 py-5'>
                                                {bus}
                                            </h2>
                                            <div className="grid grid-cols-2 mb-2">
                                                <Heading text={"From"} className="!mb-0 !text-sm !font-semibold" />
                                                <Heading text={"Destination"} className="!mb-0 !text-sm !font-semibold" />
                                                <Heading text={from} className="!mb-0 !text-sm" />
                                                <Heading text={to} className="!mb-0 !text-sm" />
                                            </div>

                                            <div className="grid grid-cols-2 mb-2">
                                                <Heading text={"Capacity"} className="!mb-0 !text-sm !font-semibold" />
                                                <Heading text={"Seat Consumed"} className="!mb-0 !text-sm !font-semibold" />
                                                <Heading text={number_of_seats} className="!mb-0 !text-sm" />
                                                {/* <Heading text={avalaibleseats} className="!mb-0 !text-sm" /> */}
                                            </div>
                                            <div className="grid gap-x-1 px-4 gap-y-0.5 pt-3 grid-cols-5">
                                                {

                                                    seat_positions?.map(({ isTaken, isReserved, _id, }, index) => {
                                                        return (
                                                            <button
                                                                key={_id}
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
                                            <UiButton
                                                className="!w-[min(400px,calc(100%-1rem))] mt-10 !mx-auto line-clamp-1 !py-4 "

                                            >
                                                <Link
                                                    to={`/seat/${_id}`}
                                                >
                                                    View More Details

                                                </Link>
                                            </UiButton>
                                        </div>

                                    )
                                }
                            </div>

                            : <AnimatedText
                                className="!text-4xl"
                                text="OOps no Aailable Bus Today "
                            />
                    }

                </div>
            </div>
        </div>
    )
}

export default AddNewBusPage