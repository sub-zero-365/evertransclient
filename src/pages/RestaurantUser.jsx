import RestaurantUserStatsContainer from "../components/RestaurantUserStatsContainer";
import Reciept from "../components/Reciept"
import { useLoaderData, useParams } from "react-router-dom"
import customFetch from '../utils/customFetch'
import {
    useQuery
} from '@tanstack/react-query'
const allRecieptsQuery = (params = {}) => {
    return (
        {
            queryKey: ["reciepts", {
                ...params
            }],
            queryFn: async () => {
                const { data } = await customFetch.get('/reciepts', {
                    params,
                });
                return data;
            },


        }
    )

}

export const loader = (queryClient) => async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allRecieptsQuery(params));
    return { searchValues: { ...params } };

}
const RestaurantUser = () => {
    const { searchValues } = useLoaderData()

    const { reciepts } = useQuery(allRecieptsQuery(searchValues))?.data || {}


    return (
        <div>
            <RestaurantUserStatsContainer
                defaultStats={{}}
            />
            <div
                className="lg:px-24 px-8 gap-x-4 grid py-5 grid-cols-[repeat(auto-fit,minmax(min(calc(100%-20px),25rem),1fr))]"

            >
                {/* {JSON.stringify(reciepts)} */}
                {reciepts?.length > 0 ?
                    reciepts?.map((reciept, idx) => <Reciept
                        {...reciept}
                        key={idx} />) : "nothing to display here"
                }

            </div>

        </div>
    )
}

export default RestaurantUser