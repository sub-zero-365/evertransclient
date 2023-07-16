import {
    ActiveStatusButton, 
    DeactiveStatusButton
  } from '../components';
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
    { label: "12am", value: "12am" },
    { label: "10pm", value: "10pm" },

]