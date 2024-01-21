import { motion } from 'framer-motion'
import { AiOutlinePlus } from 'react-icons/ai'

import { useEffect, useState } from 'react'
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import EmptyModal from './ShowBuses'
import InputBox from '../components/InputBox'
import LoadingButton from '../components/LoadingButton'
import { Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UiButtonDanger } from '../components/UiButton'
import AnimatedText from '../components/AnimateText'
const citiesQuery = {
  queryKey: ["cities"],
  queryFn: async () => {
    const res = await customFetch.get("/cities");
    return res.data
  }
}

export const action = (queryClient) => async ({ request }) => {
  // some great logic in here
  try {
    const formData = await request.formData();
    console.log(formData);
    const type = formData.get("type")
    if (type == "addnewcity") {
      const cityName = formData.get("city_name")
      // run add new city here
      await customFetch.post("/cities", { value: cityName })
    }
    else if (type == "deletecity") {
      const id = formData.get("id")
      const origin_city_name = formData.get("origin_city_name")
      const city_name = formData.get("city_name")
      if (origin_city_name?.toLowerCase() !== city_name?.toLowerCase()) {
        toast.error("incorrect city name ")
        return null
      }

      // run add new city here
      await customFetch.delete("/cities/" + id)
    }
    else {
      // run delete city here

    }

  } catch (err) {
    toast.error(err?.response?.data || err.message)
    return err?.response?.data || err.message
  }
  return null
}

export const loader = (queryClient) => async ({ }) => {
  return await queryClient.ensureQueryData(citiesQuery)
}

const Cities = () => {
  const [toggle, setToggle] = useState(false)
  const [open, setOpen] = useState(false)
  const [city, setCity] = useState(false)
  const [id, setId] = useState(null)
  const { cities } = useQuery(citiesQuery)?.data || []
  useEffect(() => {
    if (!open) {
      if (edit) {
        setEdit(false)
      }
    }
  }, [open])
  const [edit, setEdit] = useState(false)

  return (
    <div className="h-[calc(100vh-3rem)] overflow-y-auto w-full select-none">

      <motion.div onClick={() => setOpen(true)}
        initial={{ x: "-50%" }}
        animate={{ scale: [0.7, 1.2, 0.8], rotate: [0, 360] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }

        }
        className="bottom-6 shadow-2xl button-add  top-auto bg-blue-400 
w-[2.5rem] h-[2.5rem] rounded-full left-1/2 overflow-hidden 
-translate-x-1/2
z-10 fixed md:hidden "
      >
        <div className="flex h-full w-full items-center scale-animation justify-center ">
          <AiOutlinePlus size={30} color="#fff" className="" />
        </div>
      </motion.div>
      <EmptyModal
        isOpen={open}
        setIsOpen={setOpen}
        title="Add City"
      >
        <Form
          method='post'
          className='px-4'
        >
          <input
            type="hidden"
            name='type'
            value="addnewcity"

          />
          <InputBox
            name="city_name"
            className="!min-h-[10rem]"
          />
          <LoadingButton
            className="!w-[min(15rem,calc(100%-2.5rem))] 
                !mx-auto !py-3.5 
                !text-lg !rounded-xl"

          >
            Add City
          </LoadingButton>

        </Form>
      </EmptyModal>
      <EmptyModal
        isOpen={toggle}
        setIsOpen={setToggle}
        title="Delete City"
      >
        <Form
          method='post'
          className='px-4'
        >
          <div
            className='py-5'
          >
            <AnimatedText
              text="Enter City Name to delete city"
              className='!text-2xl'
            />
            <div
              className='text-rose-700 font-black !text-center !text-3xl'
            >{city}</div>
          </div>
          <input
            type="hidden"
            name='type'
            value="deletecity"

          />
          <input
            type="hidden"
            name='id'
            value={id}
          />
          <input
            type="hidden"
            name='origin_city_name'
            value={cities?.find(({ _id }) => _id == id)?.value}
          />

          <InputBox
            name="city_name"
            className="!min-h-[10rem]"
          />
          <LoadingButton
            className="!w-[min(15rem,calc(100%-2.5rem))] 
            !bg-rose-700
            hover:bg-rose-900
                !mx-auto !py-3.5 
                !text-lg !rounded-xl"

          >
            Delete City
          </LoadingButton>

        </Form>
      </EmptyModal>

      <div className="flex items-center justify-between">
        <h1 className="text-center  md:text-start text-xl mx-auto w-full my-6 md:text-2xl">Cities </h1>
        <motion.div onClick={() => setOpen(true)}
          animate={{ scale: [0.7, 1.2, 0.8], rotate: [0, 360] }}
          className="bottom-6 shadow-2xl button-add px-6 top-auto text-white items-center bg-blue-400 
min-h-[2.5rem] rounded  
 hidden  md:flex "
        >
          <AiOutlinePlus size={30} color="#fff" className="" />
          <h2>Addcity</h2>

        </motion.div>
      </div>

      {
        cities.map((item, index) => (

          <motion.div
            key={index}

            className='flex gap-4 justify-between px-5 max-w-4xl mb-4 pb-1 items-center border-b-2' >
            <div>
              {index + 1}
            </div>
            <div className='flex-1  justify-between flex'>
              <h1>{item.value} </h1>
              <span className='flex item-center gap-2'>
                <UiButtonDanger
                  onClick={() => {
                    setToggle(true)
                    setCity(item.value)
                    setId(item._id)
                  }}
                >
                  Delete
                </UiButtonDanger>
                {/* <UiButton
                  onClick={() => {
                    setOpen(true)
                    setId(item._id)
                    setCity(item.value)
                  }}
                >
                  Edit
                </UiButton> */}
              </span> </div>
          </motion.div>
        ))
      }

    </div>
  )
}

export default Cities