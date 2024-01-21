import { useLoaderData, Outlet, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Heading } from "../components"
import customFetch from "../utils/customFetch"
import { NavLink, useMatch, useResolvedPath, useNavigate, useNavigation } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Rounded } from "../components"
import { createContext, useContext } from "react";

const EditSingleTicketContext = createContext()

const singleTicket = (id) => {
    return ({
        queryKey: ["ticket", id],
        queryFn: async () => {
            const res = await customFetch.get(`/ticket/${id}`)
            return res.data
        }

    })

}

export const loader = (queryClient) => async ({ request, params }) => {
    try {
        await queryClient.ensureQueryData(singleTicket(params.id));
        return params.id
    } catch (err) {
        throw err
    }

}
const CustomNavLink = ({ to, title, number }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <li className={`flex md:w-full items-center ${match ? "text-blue-600 dark:text-blue-500" : ""} sm:after:content-['']- after:w-full- after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">

                {
                    number ? <span class="mr-2">{number}</span> : <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                }

                {title}

            </span>
        </li>
    )
}
const EditSingleTicket = () => {
    const navigate = useNavigate()
    const navigation = useNavigation()
    const isPageLoading = navigation.state === "loading"

    const id = useLoaderData()
    const { ticket } = useQuery(singleTicket(id))?.data ?? {}
    return (
        <EditSingleTicketContext.Provider
            value={{ ticket ,id}}
        >
            <div className="max-w-6xl mx-auto max-h-[calc(100vh-4rem)] overflow-auto scrollto">
                <div className="flex py-3 flex-start gap-x-4 items-center">
                    <div onClick={() => navigate(-1)}
                    >

                        <Rounded
                            className="!w-10 !h-10"
                        >
                            <AiOutlineArrowLeft
                                size={25}

                            />

                        </Rounded>
                    </div>
                    <Heading
                        className="!m-0 !p-0 !text-3xl"
                        text="Dashboard"
                    />
                </div>

                <ol class="flex justify-center max-w-2xl mx-auto items-center w-full text-sm font-medium text-center- text-gray-500 dark:text-gray-400 sm:text-base">
                    <CustomNavLink
                        to="./"
                        title="Find Avalaible bus"
                    />
                    <CustomNavLink
                        number={2}
                        to={`/user/edit/${id}/buses`}
                        title="Select bus from list"
                    />
                </ol>
                {
                    isPageLoading ? "loading buses please wait" : <Outlet
                        context={{ ticket,id }}
                    />
                }

            </div>
        </EditSingleTicketContext.Provider>
    )
}
export const useEditSingleTicketContext = () => useContext(EditSingleTicketContext)

export default EditSingleTicket