// import { useQuery } from '@tanstack/react-query'
import customFetch from "./customFetch"

import { useQuery } from '@tanstack/react-query'
const citiesQuery = (inputValue = "") => {
    return {
        queryKey: ["cities", inputValue],
        queryFn: async () => {
            const res = await customFetch.get("/cities", {
                params: {
                    search: (inputValue || "")
                }
            })
            return res.data
        }
    }
}
export const useCities = async (inputValue) => {
    return useQuery(citiesQuery(inputValue))
}
export const getCities = async (inputValue = "") => {
    // const wait = () => new Promise(r => setTimeout(() => {
    //     r()
    // }, 200))
    // await wait()
    // return cities
    const res = await customFetch.get("/cities", {
        params: {
            search: (inputValue || "")
        }
    })
    return res?.data?.cities



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

        const buses_name = buses.map(({ _id, name, feature, number_of_seats }) => ({
            label: name,
            value: _id,
            feature: feature || "vip bus",
            number_of_seats: number_of_seats,

        }))
        return buses_name
    } catch (err) {
        return err.response.data

    }

}
export const getCustomerName = async (inputValue = "") => {
    try {
        const res = await customFetch.get("/mails/ranked-users", {
            params: {
                search: inputValue
            }
        })
        let users = res.data?.rankUsers;
        console.log("this is the users", users)
        users = users.map((obj) => ({ label: obj.senderfullname, value: obj.senderfullname ,obj}))
        return users
    } catch (err) {
        console.log(`this is the error from the server `, err?.response?.data || err?.message)
        return []
    }

}
export const getCustomerPhone = async (inputValue = "") => {
    try {
        const res = await customFetch.get("/ranked-users", {
            params: {
                numberFilter: inputValue
            }
        })
        let users = res.data?.rankUsers;
        users = users.map(({ phone }) => ({ label: phone, value: phone }))
        return users
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
