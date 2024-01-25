import React, { useMemo } from 'react'
import AnimatedText from "../components/AnimateText"
import Mail from "../components/Mail"

import { useQuery } from "@tanstack/react-query"
import { useLoaderData, useSearchParams } from "react-router-dom"
import {
    BarChart,
    LineChart,
    PieChart,
    Scrollable
} from '../components'
import FilterButton from '../components/FilterButton'
import customFetch from "../utils/customFetch"
import { chatsOptions, dateSortedOption } from '../utils/sortedOptions'
import { useQueryFnc, allMailsQuery } from "../utils/tenstackqueryfnc"
// const allMailsQuery = (params) => {
//     const { search, sort, page, quickdatesort, createdBy } = params
//     const searchValues = {
//         search: search ?? "",
//         page: page ?? 1,
//         sort: sort ?? "newest",/* mailStatus: mailStatus ?? "all" */
//         quickdatesort: quickdatesort || "",
//         createdBy
//     }
//     return {
//         queryKey: [
//             'mails', searchValues
//         ],
//         queryFn: async () => {
//             const { data } = await customFetch.get('/mails', {
//                 params: searchValues
//             });
//             return data;
//         },
//         // keepPreviousData: true
//     };
// };
export const loader =
    (queryClient) =>
        async ({ request }) => {
            const params = Object.fromEntries([
                ...new URL(request.url).searchParams.entries(),
            ]);
            await queryClient.ensureQueryData(allMailsQuery(params));
            return { searchValues: { ...params } };
        };

const MailsStat = () => {
    // const [querySearch] = useSearchParams()

    const [searchParams] = useSearchParams({
        chartOption: "bar"
    })
    const { searchValues } = useLoaderData()
    const { mails,
        nHits,
        totalMailsSum,
        totalSentMails,
        totalPendingMails,
        totalRecievedMails,
        sentMailsPercentage,
        pendingMailsPercentage,
        recievedMailsPercentage,
        pendingSum,
        sentSum,
        recievedSum } =
        useQueryFnc(allMailsQuery(searchValues))?.data || {}
    const userData = {
        labels: ["Pending", "Sent", "Recieved"],
        datasets: [
            {
                label: "Number vs MailStatus",
                // data: users?.map((v) => v.total)
                data: [
                    totalPendingMails,
                    totalSentMails,
                    totalRecievedMails,
                ],
                backgroundColor: ["red", "blue", "green"]
            },
        ]

    }
    const { activeSearch } = useMemo(() => {
        const obj = {
            total: 0,
            pending: {
                counts: 0,
                arr: []
            },
            sent: {
                counts: 0,
                arr: []
            },
            recieved: {
                counts: 0,
                arr: []
            },
        };

        mails?.map((mail) => {
            obj.total++
            if (mail.status == "pending") {
                obj.pending.arr.push(mail)
                obj.pending.counts++
            }
            if (mail.status == "sent") {
                obj.sent.arr.push(mail)
                obj.sent.counts++
            }
            if (mail.status == "recieved") {
                obj.recieved.arr.push(mail)
                obj.recieved.counts++
            }
        })
        return {
            obj,
            activeSearch: mails?.filter(({ status }) => {
                const queryParams = searchParams.get("mailStatus")
                if (queryParams == "all" || queryParams == null) return true
                if (status === queryParams) return true
            })
        }

    }, [searchValues])
    return (
        <div className="pt-4 px-2 max-w-full overflow-x-auto select-none
    max-h-[calc(100vh-4rem)] overflow-y-auto bg-color_light dark:bg-color_dark" >
            <AnimatedText
                className=''
                text="Mail Stats"
            />
            <div
                className='!hidden -flex max-w-full flex-col lg:flex-rw lg:flex-row-reverse gap-x-2'
            >
                <div
                    className='flex-1 lg:w-1/2'
                >
                    <Scrollable className="!justify-start !max-w-4xl  !w-fit !mx-auto px-4 pb-5 scrollto">
                        {
                            chatsOptions.map((query) => <FilterButton
                                name="chartOption"
                                {...query} key={query} />)
                        }

                    </Scrollable>
                    <div
                        className="!max-w-4xl mx-auto"
                    >
                        {
                            userData && (
                                searchParams.get("chartOption") == "line" && <LineChart chartData={userData} />
                                ||

                                searchParams.get("chartOption") == "bar" && <BarChart chartData={userData} /> ||
                                searchParams.get("chartOption") == "pie" && <PieChart chartData={userData} />

                            )
                        }

                    </div>

                </div>
                <div
                    className='flex-1 lg:w-1/2'
                >
                    {/* <SearchComponent /> */}

                    <Scrollable
                        className="max-w-5xl mx-auto !mb-5 "
                    >

                        {
                            dateSortedOption.map((query) => <FilterButton
                                name="quickdatesort"
                                {...query} key={Math.random()} />)
                        }
                    </Scrollable>


                </div>
            </div>


            <Scrollable className="!hidden !justify-start !mt-5 scrollto  !max-w-full !w-fit !mx-auto px-4 pb-5">


                <FilterButton className="!shadow-none"
                    value="all"
                    label={`All (${nHits})`}
                    name="mailStatus"


                />
                <FilterButton className="!shadow-none"
                    value="pending"
                    label={`Pending (${totalPendingMails})`}
                    name="mailStatus"
                />
                <FilterButton className="!shadow-none"
                    value="sent"
                    label={`Sent (${totalSentMails})`}
                    name="mailStatus"
                />
                <FilterButton
                    value="recieved"
                    label={`Recieved (${totalRecievedMails})`}
                    name="mailStatus"
                />
                {/* ) */}


                {/* } */}

            </Scrollable>

            <div
                className="lg:px-24 px-8 gap-x-4 grid py-5 grid-cols-[repeat(auto-fit,minmax(min(calc(100%-20px),25rem),1fr))]"

            >
                {activeSearch?.map((mail) => <Mail key={mail._id}
                    {...mail}
                    isAdmin
                />)}
                {
                    nHits < 1 && <AnimatedText
                        className="!text-4xl"
                        text="No Items matches your query "
                    />
                }

            </div>
        </div>
    )
}

export default MailsStat