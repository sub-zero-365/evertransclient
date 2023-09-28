
import DatePicker from 'react-datepicker';
import { useState } from 'react'
import UiButton from '../components/UiButton'
import TimeSelect from "react-select"
import { timeOptions } from '../utils/sortedOptions'
import { useOutletContext } from 'react-router-dom'
import { ToggleSwitch } from '../components';
import { Form, useNavigation, redirect } from "react-router-dom"
import dayjs from "dayjs"
export const action = async ({ request }) => {
    const form = await request.formData()
    var date = form.get("date") || new Date()
    var time = form.get("time")
    var id = form.get("id")
    date = dayjs(date).format("YYYY/MM/DD")
    console.log(date, form.get("time"),)
    return redirect(`buses?date=${date}&time=${time}&id=${id}`)

}

export default function FindBusSingle() {
    const [startDate, setStartDate] = useState(new Date());
    const [disable, setDisable] = useState(true)
    const navigation = useNavigation()
    const { ticket, id } = useOutletContext()
    const isSubmitting = navigation.state == "submitting"
    return (
        <div>
            <Form
                method="post"
                className=""

            >
                <input
                    type="hidden"
                    name="date"
                    value={startDate}

                />
                <input
                    type="hidden"
                    name="id"
                    value={id}

                />

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
                <div className='items-center  flex mx-auto border border-orange-400 w-full max-w-sm'>
                    <div
                        className='flex-1'
                    >
                        <TimeSelect
                            name="time"
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
                    </div>
                    <ToggleSwitch
                        message="time query is on"
                        initialMessage="query with date?"
                        state={disable}
                        onChange={() => setDisable(c => !c)}
                    />
                </div>
                <UiButton
                    disabled={isSubmitting}
                    type="submit"
                    className="w-[min(25rem,100%)] !rounded-xl !block !mx-auto !py-3"
                >
                    {

                        isSubmitting ? <p className='text-xl'>please wait ...</p> : <p className='text-xl'>Find bus</p>
                    }


                </UiButton>

            </Form>
        </div>
    )

}