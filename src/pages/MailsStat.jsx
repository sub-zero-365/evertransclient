import React, { useMemo } from 'react'
import AnimatedText from "../components/AnimateText"
import PercentageCard from '../components/PercentageCard'
import Mail from "../components/Mail"

import {
  AmountCount,
  Scrollable
  , BarChart,
  LineChart,
  PieChart
} from '../components'
import { MdOutlinePriceChange } from 'react-icons/md'
import { dateSortedOption } from '../utils/sortedOptions'
import { useLoaderData } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import customFetch from "../utils/customFetch"
import FilterButton from '../components/FilterButton';
import {
  chatsOptions,
  usersRoleOptions
} from "../utils/sortedOptions"
import { useSearchParams } from "react-router-dom"
const allMailsQuery = (params) => {
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
    useQuery(allMailsQuery(searchValues)).data || {}
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
    <div className=' mx-auto pb-10'>
      <AnimatedText
        className=''
        text="Mail Stats"
      />
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
      <Scrollable
        className="max-w-5xl mx-auto !mb-5 "
      >

        {
          dateSortedOption.map((query) => <FilterButton
            name="quickdatesort"
            {...query} key={Math.random()} />)
        }
      </Scrollable>
      <Scrollable
        className="!items-stretch mx-auto !max-w-4xl !grid grid-cols-1 lg:!grid-cols-2 gap-y-6 !px-4 "
      >
        <AmountCount
          className="!bg-blue-400 !flex-none !mb-0"
          text="Total coset of all tickets"
          icon={<MdOutlinePriceChange />}
          amount={totalMailsSum} />
        <PercentageCard
          percent={pendingMailsPercentage}
          total={totalPendingMails}
          heading={"Pending"}
          price={pendingSum}
          stroke="red"
        />
        <PercentageCard
          heading={"Sent"}
          percent={sentMailsPercentage}
          total={totalSentMails}
          price={sentSum}
          stroke="blue"
        />
        <PercentageCard
          percent={recievedMailsPercentage}
          total={totalRecievedMails}
          price={recievedSum}
          heading={"Recieved"}
          stroke="green" />
      </Scrollable>

      <Scrollable className="!justify-start !mt-5 scrollto  !max-w-full !w-fit !mx-auto px-4 pb-5">


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