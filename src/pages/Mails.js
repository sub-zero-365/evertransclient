import { useFilter } from "../Hooks/FilterHooks"
import AnimatedText from "../components/AnimateText"
import { Heading, Scrollable } from "../components"
import UiButton from "../components/UiButton"
import { useLoaderData, useSearchParams } from "react-router-dom"
import Mail from "../components/Mail"
import customFetch from "../utils/customFetch"
import { useQuery } from "@tanstack/react-query"

import CustomSelect from "../components/CustomSelect"
import { sortedDateOptions, queryOptions } from "../utils/sortedOptions"
import SelectSortDate from 'react-select';

const allMailsQuery = (params = {}) => {
  const { search, sort, page, mailStatus } = params
  return {
    queryKey: [
      'mails', params
      // { search: search ?? "", page: page ?? 1, sort: sort ?? "newest", mailStatus: mailStatus ?? "all" }
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/mails', {
        params,
      });
      return data;
    },
    keepPreviousData: true
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

const style = {
  control: (base, state) => {
    // console.log(state.isFocused)
    return ({
      ...base,
      boxShadow: "none",
      backgroundColor: "transparent",
      borderRadius: 0,
      fontSize: 1 + "rem",
      cursor: "pointer",
      // backgroundColor: state.isSelected ? "red" : "green"
    }
    )
  }


}
const Mails = () => {
  const [querySearch] = useSearchParams()
  const { handleChange, handleFilterChange } = useFilter()





  const FilterButton = (props) => {
    const { value } = props
    const isSelected = value === querySearch.get("mailstatus")
    return (
      <UiButton
        onClick={() => handleFilterChange("mailstatus", value)}
        className={`!px-8 !py-2.5 !uppercase ${isSelected && "!bg-green-900 !rounded-lg"}`}

      > {props.value}</UiButton>

    )

  }
  const { searchValues } = useLoaderData()
  const { mails } = useQuery(allMailsQuery(searchValues)).data || []
  return (
    <div>
      <Heading
        text="Mails"
        className="!text-4xl !text-center !mb-10 !font-black"
      />
      <Scrollable className="!justify-center pt-10">
        {
          queryOptions.map((query) => <FilterButton {...query} key={query} />)
        }

      </Scrollable>
      <Scrollable className="!justify-center !gap-y-6 !overflow-visible !flex-wrap pt-10 !mb-20">

<div className="!mb-2 !flex-none ">
            <h1 className="text-sm  text-center font-bold ">sort</h1>
            <SelectSortDate
              options={sortedDateOptions}
              styles={style}
              defaultValue={{
                label: querySearch.get("mailStatus") || "createdAt -",
                value: "newest"
              }}
              // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

              isSearchable={false}
              onChange={(e) => handleFilterChange("filter", e.value)}

              className='!border-none !h-8 mt-0' />
          </div>
        

      </Scrollable>



      <div
        className="lg:px-24 px-8 gap-x-4 grid py-5 grid-cols-[repeat(auto-fit,minmax(min(calc(100%-20px),25rem),1fr))]"

      >
        {mails?.map((mail) => <Mail key={mail._id}
          {...mail}
        />)}

      </div>
      <UiButton>
        LOAD MORE

      </UiButton>
    </div>
  )
}

export default Mails