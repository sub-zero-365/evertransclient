import { useQuery } from "@tanstack/react-query"
import { USER_ROLES } from "./roles"
import customFetch from "./customFetch"
export const allMailsQuery = (params) => {
    const { search, sort, page, quickdatesort, createdBy } = params
    const searchValues = {
        search: search ?? "",
        page: page ?? 1,
        sort: sort ?? "newest",/* mailStatus: mailStatus ?? "all" */
        quickdatesort: quickdatesort || "",
        createdBy
    }
    return {
        queryKey: [
            'mails', searchValues
        ],
        queryFn: async () => {
            const { data } = await customFetch.get('/mails', {
                params: searchValues
            });
            return data;
        },
        // keepPreviousData: true
    };
};
export const usersQuery = {
    queryKey: ["admin-users"],
    queryFn: async () => {
        const res = await customFetch.get(
            "/users/user-stats",
        )
        return res.data

    }
}
export  const ticketsQuery = (params = {}) => {
    return ({
        queryKey: ["tickets", { ...params }],
        queryFn: async () => {
            const res = await customFetch.get("/ticket",
                {
                    params
                })
            return res.data
        },
        keepPreviousData: true
    })
}
export const useQueryFnc = (func) => {
    return useQuery(func)
}