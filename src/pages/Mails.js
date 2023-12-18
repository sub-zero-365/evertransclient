import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useLoaderData, useSearchParams } from "react-router-dom"
import { useFilter } from "../Hooks/FilterHooks"
import { Heading, Scrollable } from "../components"
import AnimatedText from "../components/AnimateText"
import FilterButton from "../components/FilterButton"
import Form from "../components/Form"
import Mail from "../components/Mail"
import UiButton from "../components/UiButton"
import customFetch from "../utils/customFetch"

import { useMemo } from "react"
const allMailsQuery = (params) => {
  const { search, sort, page, quickdatesort, daterange } = params
  const searchValues = {
    search: search ?? "",
    page: page ?? 1,
    sort: sort ?? "newest",/* mailStatus: mailStatus ?? "all" */
    quickdatesort: quickdatesort || "",
    daterange: daterange || ""
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


export const loader =
  (queryClient) =>
    async ({ request }) => {
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);
      await queryClient.ensureQueryData(allMailsQuery(params));
      return { searchValues: { ...params } };
    };


const Mails = () => {
  const [querySearch] = useSearchParams()
  const { handleFilterChange } = useFilter()
  const { searchValues } = useLoaderData()
  const { mails, nHits,
    totalMailsSum,
    totalSentMails,
    totalPendingMails,
    totalRecievedMails } =
    useQuery(allMailsQuery(searchValues)).data || {}


  const {activeSearch } = useMemo(() => {
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
        const queryParams = querySearch.get("mailStatus")
        if (queryParams == "all" || queryParams == null) return true
        if (status === queryParams) return true
      })
    }

  }, [searchValues,
    totalSentMails,
    totalPendingMails,
    totalRecievedMails])

  return (
    <div>
      <Heading
        text="Mails"
        className="!text-4xl !text-center !mb-10 !font-black"
      />
      <Heading
        text="Mail Status"
        className="!text-center !m-0 !p-0  !text-2xl "
      />

      <Scrollable className="!justify-start scrollto  !max-w-full !w-fit !mx-auto px-4 pb-5">


        <FilterButton className="!shadow-none"
          // value="all"
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



      <Form
        placeholder="search products, sendername ,recievername"
        className="!mx-auto !max-w-lg w-full"
        onChange={search => handleFilterChange("search", search)}
      />


      <motion.div
        key={"mailbox" + querySearch.get("mailStatus")}
        initial={{
          y: 20,
          opacity: 0.2
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{ duration: 1 }}
        className="lg:px-24 px-8 gap-x-4 grid py-5 grid-cols-[repeat(auto-fit,minmax(min(calc(100%-20px),25rem),1fr))]"

      >
        {activeSearch?.map((mail) => <Mail key={mail._id}
          {...mail}
        />)}
        {
          nHits < 1 && <AnimatedText
            className="!text-4xl"
            text="No Items matches your query "
          />
        }

      </motion.div>
      {
        nHits &&
        <UiButton>
          LOAD MORE
        </UiButton>
      }
    </div>
  )
}

export default Mails