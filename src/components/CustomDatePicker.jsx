
import DatePicker from 'react-datepicker'
import { useState, useRef, forwardRef } from "react"
import { Heading } from './'
const CustomDatePicker = ({ startDate, setStartDate, inline, min, maxDate}) => {
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div
            className="w-full
            max-w-[10rem]
          border-b
          mt-[20px]
          mx-auto
          shadow-sm border-black 
          gap-2
          p-1 
          rounded-0
          bg-transparent my-1  "
            onClick={onClick} ref={ref}>

            <div className="flex-1">
                <Heading text="Boarding Date" className="!text-sm !text-slate-400  !mb-1" />
                <p className="text-xs md:text-lg text-center text-slate-500 font-[500]">{value && (new Date(value).toDateString())}</p>
            </div>
        </div>
    ));
    return (
        <div>

            <DatePicker
                wrapperClassName="datePicker"
                className="datePicker"
                selected={startDate}
                onChange={evt => {
                    setStartDate(evt)
                }}

                minDate={new Date()}
                Date={new Date()}
                required
                maxDate={maxDate}
                inline={inline && true}
                customInput={<ExampleCustomInput />
                }
            />

        </div>

    )
}
export default CustomDatePicker