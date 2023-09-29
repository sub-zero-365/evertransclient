
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
    // const [disable, setDisable] = useState(true)
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

                <div className="flex justify-center items-center mt-10 mb-20">
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
                
                <UiButton
                    disabled={isSubmitting}
                    type="submit"
                    className="w-[min(30rem,100%)] !rounded-lg !block !mx-auto !py-5"
                >
                    {

                        isSubmitting ? <p className='text-xl'>please wait ...</p> : <p className='text-xl'>Search</p>
                    }


                </UiButton>

            </Form>
        </div>
    )

}