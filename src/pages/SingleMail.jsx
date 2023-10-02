import { useQuery } from "@tanstack/react-query"
import customFetch from "../utils/customFetch"
import { useLoaderData } from "react-router-dom"



const singleMail = (url, id) => {
    return ({
        queryKey: ["mail", id],
        queryFn: async () => {
            const res = await customFetch.get(url)
            return res.data
        }

    })

}

export const loader = (queryClient) => async ({ request, params }) => {
    const searchParams = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    try {
        var url = "/mails/" + params.id
        const readonly = searchParams.readonly === "7gu8dsutf8asdf" || false
        if (readonly) {
            url = `/assistant/ticket/${params.id}`
        }
        // try to get the previous page from user being
        await queryClient.ensureQueryData(singleMail(url, params.id));

        return {
            id: params.id,
            url,
            readonly
        }
    } catch (err) {
        throw err
    }

}


const SingleMail = () => {
    const { id, url } = useLoaderData()

    const { mail } = useQuery(singleMail(url, id)).data
    return (
        <div>SingleMail
            { JSON.stringify(mail)}
        </div>
    )
}

export default SingleMail