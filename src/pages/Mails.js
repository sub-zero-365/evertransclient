import { useFilter } from "../Hooks/FilterHooks"
import AnimatedText from "../components/AnimateText"
import { Scrollable } from "../components"
import UiButton from "../components/UiButton"
import { useLoaderData, useSearchParams } from "react-router-dom"
import Mail from "../components/Mail"
import customFetch from "../utils/customFetch"
import { useQuery } from "@tanstack/react-query"




const allMailsQuery = (params) => {
  // console.log("this is the params", params)
  const { search, sort, page } = params
  return {
    queryKey: [
      'mails',
      { search: search ?? "", page: page ?? 1, sort: sort ?? "newest" }
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/mails', {
        params,
      });
      return data;
    },
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
  const { handleChange, handleFilterChange } = useFilter()
  const queryOptions = [
    {
      value: "all",
      label: "all"
    },
    {
      value: "my owns",
      label: "own"
    },
    {
      value: "pending",
      label: "pending"
    },
    {
      value: "recieved",
      label: "recieved"
    },

  ]




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
      <AnimatedText
        text="under maintenances oops"
        className="!text-3xl"
      />
      <Scrollable className="!justify-center">
        {
          queryOptions.map((query) => <FilterButton {...query} key={query} />)
        }

      </Scrollable>
      <div
        className="lg:px-24 px-8 gap-x-4 grid py-5 grid-cols-[repeat(auto-fit,minmax(min(calc(100%-20px),25rem),1fr))]"

      >
        {mails?.map((mail) => <Mail key={mail._id}
          {...mail}
        />)}

      </div>
    </div>
  )
}

export default Mails