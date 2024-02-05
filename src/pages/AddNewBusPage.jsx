import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { default as BusSelect, default as FromSelect, default as ToSelect } from 'react-select/async';
import { Heading, Scrollable } from "../components";
import AnimatedText from "../components/AnimateText";
import UiButton from "../components/UiButton";
import { getBuses, getCities } from "../utils/ReactSelectFunction";
import customFetch from "../utils/customFetch";
// import React from 'react'
import { useMemo } from "react";
import { toast } from "react-toastify";
import LoadingButton from "../components/LoadingButton";
import { style } from "../utils/reactselectOptionsStyles";
import EmptyModal from "./ShowBuses";
import { USER_ROLES } from "../utils/roles";
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

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    // data.date
    try {
        await customFetch.post('/seat', data);
        queryClient.invalidateQueries(['seats']);
        toast.success('Seat added successfully ');
        const user_state = await queryClient.getQueryState({ queryKey: ["user"] })
        const role = user_state?.data?.user?.role
        if (role !== USER_ROLES.ticketer) return redirect("/dashboard/seat")
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
    const routesQuery = useMemo(() => {
        return [...new Set([...seats?.map(({ from, to }) => `${from?.toLowerCase()}-${to?.toLowerCase()}`)])]
    }, [searchValues])

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className="max-w-7xl mx-auto py-10"
        >
            <AnimatedText
                text={`Available Cars for ${searchValues.date}`}
                className="!text-4xl lg:!text-6xl"
            />
            <UiButton
                onClick={() => setIsOpen(true)}
                className=" !w-[min(250px,calc(100%-1rem))] !mx-auto line-clamp-1 !py-4 !my-10"
            >
                Add New Seat
            </UiButton>
            {/* {JSON.stringify(seats)} */}

            {/* <Scrollable className="!justify-start scrollto  !max-w-full !w-fit !mx-auto px-4 pb-5">
                        <FilterButton className="!shadow-none"
                            value={null}
                            label={`All`}
                            name="routequery"

                        />
                        {routesQuery?.map((route) => <FilterButton className="!shadow-none"
                            value={`${route}`}
                            label={`${route}`}
                            name="routequery"


                        />)}



                       

                    </Scrollable> */}

            <div
                className="lg:flex items-start justify-start flex-row-reverse w-full gap-x-5 "
            >

                <EmptyModal
                    title={"Add New Car To A Route"}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}>
                    <Form method="post">
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
                                    isSearchable={false}

                                    styles={{
                                        ...style,
                                        wdith: "100%",
                                        fontSize: 10 + "px"
                                    }}

                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                                    className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                                // onChange={evt => setFromCities(evt.value)}
                                />

                            </div>
                            <div>
                                <Heading text="To" className={"!mb-1 !mt-2 !text-lg first-letter:font-black"} />
                                <ToSelect
                                    name="to"
                                    isSearchable={false}

                                    defaultOptions
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


                                className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                            />


                        </div>

                        <LoadingButton
                            className="!w-[min(250px,calc(100%-1rem))] !mx-auto line-clamp-1 !py-4 !-mb-4"

                        >
                            Submit
                        </LoadingButton>
                    </Form>

                </EmptyModal>

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

                                            <Link
                                                to={`/seat/${_id}`}
                                                className="w-full h-full max-w-sm mx-auto text-gray-600 text-lg font-medium  text-center  my-5 italic block underline underline-offset-2"
                                            >
                                                View More Details

                                            </Link>
                                        </div>

                                    )
                                }
                            </div>

                            : <AnimatedText
                                className="!text-xl"
                                text="OOps no Aailable Car Today "
                            />
                    }

                </div>
            </div>
        </div>
    )
}

export default AddNewBusPage
