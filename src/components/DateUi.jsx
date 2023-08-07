import dayjs from 'dayjs'
import { Heading } from './'
const DateUi = ({ date, time }) => {
  const daysofweek = [
    "mon", "tues", "wed", "thurs", "fri", "sat", "sun"
  ]
  return (
    <div className="flex justify-between px-4 items-center max-w-sm mx-auto mt-10">
      <Heading text={`${daysofweek[dayjs(date).format("D")]}day`} className={"!text-sm first-letter:text-lg capitalize"} />
      <Heading text={`On ${new Date(date).toLocaleDateString()} At`} className={"!text-lg"} />
      <Heading text={time} className={"!text-sm"} />
    </div>)

}
export default DateUi
