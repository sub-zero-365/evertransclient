import React, { useEffect, useMemo } from 'react'
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
import { useUserContext } from './UserStats'
import UiButton from '../components/UiButton'
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
  const { setStats,setIsOpen } = useUserContext()
  // const [querySearch] = useSearchParams()
  const statsQuery = useQuery({
    queryKey: ["mailstats"],
    queryFn: async () => {
      const { data } = await customFetch.get('/mails/showstats', {
        params: searchValues
      });
      return data;
    },
  })
  console.log("this is the stats data here",statsQuery?.data)
  useEffect(() => {
    setStats(statsQuery?.data)
  }, [statsQuery?.data])
  // setStats("the man and the woman")
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
  
  return (
    <div className=' mx-auto min-h-screen pb-10'>
      <AnimatedText
        className=''
        text="Mail Stats"
      />
       <UiButton
            onClick={() => setIsOpen(c => !c)}
            className="w-[min(calc(100%-10px),500px)] mx-auto !py-4 !bg-blue-900 lg:hidden"
          >
            6Months Stats
          </UiButton>
      <Scrollable className="!justify-start !max-w-4xl  !w-fit !mx-auto px-4 pb-5 scrollto lg:hidden">
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
        className="max-w-5xl mx-auto !mb-5 lg:hidden "
      >
        {
          dateSortedOption.map((query) => <FilterButton
            name="quickdatesort"
            {...query} key={Math.random()} />)
        }
      </Scrollable>
      <Scrollable
        className="!items-stretch mx-auto !max-w-4xl hidden -!grid grid-cols-1 lg:!grid-cols-2 gap-y-6 !px-4 "
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

   
    </div>
  )
}

export default MailsStat