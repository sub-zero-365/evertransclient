import { redirect, useLoaderData } from "react-router-dom";
import AnimatedText from "../components/AnimateText"
import BusCard from "../components/BusCard"
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify"
import { useMemo } from "react";
import { useFilter } from "../Hooks/FilterHooks";
const successEdit = () => toast.success("edit successfully !!!")
const errorEdit = () => toast.error("something went wrong !!!")
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
const singleTicket = (id) => {
    return ({
        queryKey: ["ticket", id],
        queryFn: async () => {
            const res = await customFetch.get(`/ticket/${id}`)
            return res.data
        }

    })

}
export const action = (queryClient) => async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        await customFetch.patch(`/ticket/updateticket/${data.id}`, {
            ...data
        })
        successEdit()
        return redirect(`/user/${params.id}`, { replace: true })
    } catch (error) {
        console.log(error.response.data)
        errorEdit()
        return null
    }

}

export const loader = (queryClient) => async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    try {
        const { ticket: currentTicket } = await queryClient.ensureQueryData(singleTicket(params.id))
        if (params.time === "null") {
            delete params.time
        }
        if (params.date) {
            params.date = `${params.date}`
        }
        const { from, to } = currentTicket
        const searchValues = {
            ...params,
            from, to,
        }
        await queryClient.ensureQueryData(busQuery(searchValues))

        return ({
            searchValues
        })
    } catch (err) {
        throw err
    }


}
const BusesSingle = () => {
    const { handleFilterChange } = useFilter()
    const { searchValues } = useLoaderData()
    const { seats, nHits } = useQuery(busQuery(searchValues))?.data
    const traveltimes = useMemo(() => [...new Set([...seats?.map(({ traveltime }) => traveltime)])], [])
    return (
        <div>
            <AnimatedText
                className="!text-3xl !py-8 "
                text="please seat a seat from this bus "
            />
            <div

                className="flex items-center justify-center flex-nowrap overscroll-x-auto gap-x-3">
                {
                    traveltimes.map((traveltime) => <div
                        className="px-8 py-2.5  text-white justify-center bg-blue-800 rounded-xl shadow-sm hover:bg-blue-950"
                        key={traveltime}
                        onClick={() => handleFilterChange("time", traveltime)}
                    >
                        {traveltime}
                    </div>)
                }
            </div>
            <p
                className="px-4 text-lg text-center text-green-500 py-5"
            >total number of bus found in this route{nHits > 1 ? "s are" : " is "}   {nHits}</p>


            <div
                className="lg:px-24 px-8 grid grid-cols-[repeat(auto-fit,minmax(min(calc(100%-20px),25rem),1fr))]"
            >
                {
                    seats?.map((seat) => <BusCard
                        key={seat}
                        {

                        ...seat}

                    />)
                }
            </div>
        </div>
    )

}
export default BusesSingle