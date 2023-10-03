import
DeactiveStatusButton
  from '../components/DeactiveStatusButton';

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

export default 748