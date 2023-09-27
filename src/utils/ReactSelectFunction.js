import { useQuery } from '@tanstack/react-query'
import customFetch from "./customFetch"
export const getCities = async (inputValue = "") => {
    try {
        const res = await customFetch.get("/allcities", {
            params: {
                search: (inputValue || "")
            }
        })

        return res?.data?.cities
    } catch (err) {
        console.log(err)
    }

}
export const getBuses = async (inputValue = "") => {
    try {
        const res = await customFetch.get("/bus",
            {
                params: {
                    search: inputValue || "",
                }
            }
        )
        const { buses } = res.data;

        const buses_name = buses.map(({ _id, name,feature }) => ({
            label: name,
            value: _id,
            feature:feature || "vip bus"
            
        }))
        return buses_name
    } catch (err) {
        return err.response.data

    }

}
export default function useCity() {

    return useQuery({
        queryKey: ["cities"],
        queryFn: getBuses()
    }
    )

}