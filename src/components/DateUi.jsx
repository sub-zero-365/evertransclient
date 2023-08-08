import dayjs from 'dayjs'
import { Heading } from './'
const DateUi = ({ date, time }) => {
  const daysofweek = [
    "sun", "mon", "tues", "wednes", "thurs", "fri", "satur"
  ]
  // const day=new Date(date).getDay() ||0
  return (
    <div className="flex justify-between px-4 items-center max-w-sm mx-auto mt-10">
      <Heading text={`${daysofweek[dayjs(date).day()]}day`} className={"!text-sm first-letter:text-lg capitalize"} />
      <Heading text={`On ${new Date(date).toLocaleDateString()} At`} className={"!text-lg"} />
      <Heading text={time} className={"!text-sm"} />
    </div>)

}
export default DateUi
