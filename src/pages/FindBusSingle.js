
import DatePicker from 'react-datepicker';
import { useState } from 'react'
import UiButton from '../components/UiButton'
import TimeSelect from "react-select"
import { timeOptions } from '../utils/sortedOptions'
import {Link} from 'react-router-dom'
export default function FindBusSingle() {
    const [startDate, setStartDate] = useState(new Date());
    const [disable, setDisable] = useState(true)
    return (
        <div>
            <div className="flex justify-center items-center">
                <DatePicker
                    wrapperClassName="datePicker"
                    className="datePicker"
                    selected={startDate}
                    onChange={evt => {
                        setStartDate(evt)
                    }}
                    minDate={new Date()}
                    Date={new Date()}
                    inline
                    required
                />
            </div>
            <TimeSelect
                isDisabled={disable}
                isSearchable={false}
                onChange={(evt) => 0}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                required className="dark:bg-slate-900 mx-2 text-black text-xs min-h-8 md:text-xl mb-6"
                defaultValue={{
                    label: "7am",
                    value: "7am"
                }}
                options={timeOptions} />
            <UiButton
                className="w-[min(25rem,100%)] !block !mx-auto !py-3"
            >
                <Link
                    to="buses"
                >
                    <p>Find bus</p>
                </Link>
            </UiButton>
        </div>
    )

}