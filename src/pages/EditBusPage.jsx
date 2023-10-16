import { Form, useLoaderData, redirect } from "react-router-dom"
import LoadingButton from "../components/LoadingButton"
import AnimatedText from "../components/AnimateText"
import customFetch from "../utils/customFetch"
import { useQuery } from "@tanstack/react-query"
import InputBox from "../components/InputBox"
import Seats from 'react-select'
import { seatOptions } from '../utils/sortedOptions'
import { components, style } from "../utils/reactselectOptionsStyles"
import { toast } from "react-toastify"
const singleBusQuery = (id) => {
    return ({
        queryKey: ["bus", id],
        queryFn: async () => {
            const res = await customFetch.get(`/bus/${id}`)
            return res.data
        }
    })
}

export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const id = data.id
    try {
        await customFetch.patch('/bus/edit/' + id, data);
        queryClient.invalidateQueries(['buses']);
        toast.success('successfully edited car');
        return redirect('/dashboard/bus?rd_from=editpage');
    } catch (error) {
        toast.error(error?.response?.data || "some thing went wrong");
        return error;
    }
}

const EditBusPage = () => {
    const id = useLoaderData()
    const { bus } = useQuery(singleBusQuery(id)).data ?? {}
    // console.log("this si sthe bus here ", bus, id)
    return (
        <div
            className="max-w-3xl max-h-[calc(100vh-4rem)] 
            h-screen overflow-y-auto mx-auto  w-full flex-none"
        >
            <Form className="max-w-2xl mx-auto" method="post">
                <AnimatedText text={"Edit Car Details "} className='!text-3xl !text-center lg:!text-4xl w-full' />
                <input type="hidden"
                    value={id}
                    name="id"
                />
                <div className='px-2'>
                    <div className="flex items-end pb-2 justify-start gap-x-4">
                        <h1 className='text-xl  font-light '>Car Name</h1>
                    </div>

                    <InputBox
                        className="!min-h-[3rem]"
                        name="name"
                        defaultValue={bus?.name}
                        hidden
                        type="text"
                    />
                </div>
                <div className='px-2'>
                    <div className="flex items-end pb-2 justify-start gap-x-4">
                        <h1 className='text-xl  font-light '>#Car Plate Number</h1>
                    </div>

                    <InputBox
                        className="!min-h-[3rem]"
                        name="plate_number"
                        defaultValue={bus?.plate_number}
                        hidden
                        type="number"
                    />
                </div>
                <div className='px-2'>
                    <div className="flex items-end pb-2 justify-start gap-x-4">
                        <h1 className='text-xl  font-light '>#Car Plate Number</h1>
                    </div>
                    <div className="max-w-[5rem] mx-auto">

                        <Seats options={seatOptions}
                            name="number_of_seats"
                            isSearchable={false}
                            styles={{
                                // ...style,
                                wdith: "100%",
                                fontSize: 10 + "px"
                            }}
                            components={components()}
                            defaultValue={{
                                value: bus?.number_of_seats,
                                label: bus?.number_of_seats,

                            }}
                        />
                    </div>
                </div>

                <LoadingButton
                    className="!w-[min(30rem,calc(100%-2.5rem))] !mx-auto !mt-10 !py-3.5 !text-lg !rounded-none"
                >
                    Save Changes
                </LoadingButton>
            </Form>
        </div>
    )
}

export default EditBusPage