import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import { AmountCount, PercentageBar, Scrollable, TicketCounts } from "../components";
import { BiCategory } from "react-icons/bi";
import { MdOutlinePriceChange } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import { VscFolderActive } from "react-icons/vsc";

const singleUserMailsQuery = (params) => {
    const { search, sort, page, quickdatesort, daterange, userId } = params
    const searchValues = {
        search: search ?? "",
        page: page ?? 1,
        sort: sort ?? "newest",/* mailStatus: mailStatus ?? "all" */
        quickdatesort: quickdatesort || "",
        daterange: daterange || "",
        createdBy: userId
    }
    return {
        queryKey: [
            'singleusermailquery', searchValues
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

export const loader =
    (queryClient) =>
        async ({ request, params: _params }) => {
            const userId = _params.id
            const params = Object.fromEntries([
                ...new URL(request.url).searchParams.entries(),
            ]);
            await queryClient.ensureQueryData(singleUserMailsQuery({ ...params, userId }));
            return {
                searchValues: {
                    ...params,
                    userId
                }
            };
        };
const UserDetailsMail = () => {
    const { searchValues } = useLoaderData();
    const { mails, nHits, total_mails,
        totalMailsSum,
        totalSentMails,
        totalPendingMails,
        totalRecievedMails,
        numberOfPages,
        currentPage,
        pendingSum,
        sentSum,
        recievedSum
    } = useQuery(singleUserMailsQuery(searchValues))?.data
    return (
        <div>




            <div className="flex items-start  flex-wrap gap-x-4 gap-y-6 justify-center ">

                {/* <Scrollable className={`!mb-10 !justify-center !w-full  flex ${false && "!grid md:!grid-cols-2 gap-y-5"} !transition-all !duration-[1s]`}>
    <PercentageBar
        className={`${false && "!min-w-[8rem]"}`}
        percent={userData?.percentageActive} text="Active Ticket Ratio" />
    <PercentageBar
        className={`${false && "!min-w-[8rem]"}`}
        stroke="red"
        percent={userData?.percentageInActive} text="InActive Ticket Ratio" />
</Scrollable> */}
                {

                    <>

                        <Scrollable className={`!px-5 ${false && "!grid md:!grid-cols-2"} !transition-all !duration-[1s] `}>
                            <TicketCounts counts={total_mails}
                                text={"Total Number Of Mails "}
                                icon={<AiOutlineSave />} />
                            <TicketCounts counts={totalSentMails}
                                text={"Total Mails Sent"}
                                icon={<VscFolderActive />} />
                            <TicketCounts counts={totalRecievedMails}
                                text={"Total Mails Recieve"}
                                icon={<VscFolderActive />} />
                            <TicketCounts counts={totalPendingMails}
                                text={"Total Mails Recieve"}
                                icon={<VscFolderActive />} />

                        </Scrollable>
                        <Scrollable className={`!px-5 ${false && "!grid md:!grid-cols-2"}`}>
                            <AmountCount
                                className="!bg-blue-400"
                                text="Total coset of all tickets"
                                icon={<MdOutlinePriceChange />}
                                amount={totalMailsSum} />
                            <AmountCount
                                className="!bg-blue-400"
                                text="Total sent Mails Cost"
                                icon={<MdOutlinePriceChange />}
                                amount={sentSum} />
                            <AmountCount
                                className="!bg-blue-400"
                                text="Total cost of pending mails"
                                icon={<MdOutlinePriceChange />}
                                amount={pendingSum} />
                            <AmountCount
                                className="!bg-blue-400"
                                text="Total cost of recieve mails"
                                icon={<MdOutlinePriceChange />}
                                amount={recievedSum} />
                            {/* <AmountCount
                className="!bg-green-400"

                text="Total coset of all active tickets"

                icon={<BiCategory/>} amount={total} />
            <AmountCount
                className="!bg-red-400 !text-black"

                text="Total coset of all inactive tickets"

                icon={<BiCategory />} amount={userData?.totalInActivePrice} /> */}
                        </Scrollable>
                    </>
                }


            </div>

        </div>
    )
}

export default UserDetailsMail