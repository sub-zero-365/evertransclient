import axios from "axios"
import { useQuery } from '@tanstack/react-query'
export const getCities = async (inputValue = "") => {
    try {
        const res = await axios.get("/allcities", {
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
        const res = await axios.get("/bus",
            {
                params: {
                    search: inputValue || "",
                }
            }
        )
        const { buses } = res.data;

        const buses_name = buses.map(({ _id, name }) => ({
            label: name,
            value: _id,
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