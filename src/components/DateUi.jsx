import dayjs from 'dayjs'
import { Heading } from './'
const DateUi = ({ date, time }) => {
  return (
    <div className="flex justify-between px-4 items-center">
      <Heading text={dayjs(date).format("DD")}  className={"!text-sm"}/>
      <Heading text={`On ${new Date(date).toLocaleDateString()}`} className={"!text-lg"}/>
      <Heading text={time} className={"!text-sm"} />
    </div>)

}
export default DateUi
