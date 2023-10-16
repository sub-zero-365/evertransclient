import
DeactiveStatusButton
  from '../components/DeactiveStatusButton';
import dayjs from "dayjs"
import ActiveStatusButton from '../components/ActiveStatusButton'
export const sortedDateOptions = [

  {
    label: "CreatedAt-",
    value: "newest"

  },
  {
    label: "CreatedAt+",
    value: "oldest"

  },
  {
    label: "traveldate-",
    value: "new_traveldate"

  },
  {
    label: "traveldate+",
    value: "old_traveldate"

  },
]
export const sortTicketStatusOptions = [
  { value: "all", label: "All tickets" },
  { value: "active", label: <span className="flex items-center justify-between">Active tickets <ActiveStatusButton className="" /> </span> },
  { value: "inactive", label: <span className="flex items-center justify-between">InActive tickets <DeactiveStatusButton className="" /> </span> },

]

export const skipOptions = [
  { label: 5, value: 5 },
  { label: 10, value: 10 },
  { label: 15, value: 15 },
  { label: 25, value: 25 },
  { label: 50, value: 50 },
  { label: 100, value: 100 },
  { label: 200, value: 200 },
]
export const timeOptions = [
  { label: "7am", value: "7am" },
  { label: "10am", value: "10am" },
  { label: "10pm", value: "10pm" },
]
export const paymentOptions = [
  { label: "Cash In", value: "Cash In" },
  { label: "CM", value: "CM" },

]
export const timeWithClearOptions = [
  { label: "clear Filter", value: "" },
  { label: "7am", value: "7am" },
  { label: "10am", value: "10am" },
  { label: "10pm", value: "10pm" },
]

export const queryOptions = [

  {
    value: null,
    label: "all"
  },
  {
    value: "pending",
    label: "pending"
  },
  {
    value: "sent",
    label: "sent"
  },
  {
    value: "recieved",
    label: "recieved"
  },

]
export const priceOptions = [
  {
    value: "500",
    label: "500"
  },
  {
    value: "1000",
    label: "1000"
  },
  {
    value: "1500",
    label: "1500"
  },
  {
    value: "2000",
    label: "2000"
  },
  {
    value: "2500",
    label: "2500"
  },
  {
    value: "400",
    label: "400"
  },

]
let now = dayjs()
export const dateSortedOption = [

  {
    label: "all time",
    value: null

  },
  {
    label: "today",
    value: now.format("YYYY/MM/DD")

  },
  {
    label: "Yesterday",
    value: now.subtract("1", "day").format("YYYY/MM/DD")

  },
  {
    label: "1 week Ago",
    value: now.subtract("14", "day").format("YYYY/MM/DD")

  },
  {
    label: "1 Month Ago",
    value: now.subtract("30", "day").format("YYYY/MM/DD")

  },
  {
    label: "1 Year Ago",
    value: now.subtract("365", "day").format("YYYY/MM/DD")

  },
]
export const seatOptions = [
  ...Array.from({ length: 6 }, (arr, i) => (
      {
          label: 4 + i,
          value: 4 + i
      }))

]

export default 748