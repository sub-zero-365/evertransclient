import axios from 'axios';
import { motion } from 'framer-motion'
import { AiOutlinePlus } from 'react-icons/ai'
import { AddCities, } from '../components'
import Alert from '../components/Alert'
import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { setCities } from '../actions/adminData';
import { Loader } from '../components';
const Cities = () => {
  const dispatch = useDispatch();
  const cities_ = useSelector(state => state.setAdminData.cities);
  const _isLoading = useSelector(state => state.setAdminData.loading.cities)
  // const token = localStorage.getItem("admin_token");
  const token = localStorage.getItem("admin_token");

  const [toggle, setToggle] = useState(false)
  const [open, setOpen] = useState(false)
  const [city, setCity] = useState(false)
  const [newCity, setNewCity] = useState(false)
  const [id, setId] = useState(null)
  // const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const setCities_ = (payload) => {
    return dispatch(setCities(payload))
  }

  async function getCities() {

    const url = process.env.REACT_APP_LOCAL_URL + "/allcities";
    if (token == null) {
      alert("login to get accesstoken")
    }
    try {
      const res = await axios.get(url, {
        headers: {
          'Authorization': "makingmoney " + token
        }
      })
      setCities_(res?.data?.cities)
    } catch (err) {
      console.log(err)
      alert("some error occurs")
    }

  }
  useEffect(() => {
    getCities();
  }, [])
  useEffect(() => {
    if (!open) {
      if (edit) {
        setEdit(false)
      }
    }
  }, [open])
  const [edit, setEdit] = useState(false)
  const editFunc = async (e) => {
    e.preventDefault()


    if (!id) return
    setIsLoading(true)
    const url = process.env.REACT_APP_LOCAL_URL + "/admin/city/" + id;
    try {
      await axios.put(url, {
        value: newCity
      },
        {
          headers: {
            'Authorization': "makingmoney " + token
          }
        })
      getCities();
      setOpen(!open)
    } catch (err) {
      alert(err.response.data)

    }
    setIsLoading(false)
  }
  const addFunc = async (e) => {
    e.preventDefault()
    const url = process.env.REACT_APP_LOCAL_URL + "/admin/city";
    setIsLoading(true)

    try {
      await axios.post(url, {
        value: newCity
      },
        {
          headers: {
            'Authorization': "makingmoney " + token
          }
        })
      getCities();
      setOpen(!open)

    } catch (err) {
      alert(err.response.data)

    }
    setIsLoading(false)

  }
  const confirmFunc = async () => {
    if (!id) return
    const url = process.env.REACT_APP_LOCAL_URL + "/admin/city/" + id;
    try {
      await axios.delete(url, {
        headers: {
          'Authorization': "makingmoney " + token
        }
      })
      getCities();
    } catch (err) {
      alert(err.response.data)
    }
    setOpen(false)
  }
  return (
    <div className="max-h-[calc(100vh-3rem)] overflow-y-auto w-full select-none">
      {_isLoading && (<Loader toggle dark />)}

      <Alert toggle={toggle} city={city}
        setToggle={setToggle} confirmFunc={confirmFunc} message={"Do you want to delete this City"} />
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
      <AddCities
        setVal={setNewCity}
        city={city} toggle={open}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        edit={edit} setToggle={setOpen} addFunc={addFunc} editFunc={editFunc} edt />

      <div className="flex items-center justify-between">
        <h1 className="text-center  md:text-start text-xl mx-auto w-full my-6 md:text-2xl">Cities </h1>
        <motion.div onClick={() => setOpen(true)}
          // initial={{ x: "-50%" }}
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
        cities_.map((item, index) => (

          <motion.div
            key={index}

            className='flex gap-4 justify-between px-5 max-w-4xl mb-4 pb-1 items-center border-b-2' >
            <div>
              {index + 1}
            </div>
            <div className='flex-1  justify-between flex'>
              <h1>{item.value} </h1>
              <span className='flex item-center gap-2'>
                <button onClick={() => {
                  setToggle(true)
                  setCity(item.value)
                  setId(item._id)
                }}
                  type="submit"
                  className="block bg-red-700
            mx-auto h-fit 
            rounded bg-primary px-2 text-xs
            py-1  font-medium
            uppercase leading-normal
            text-white
            shadow-[0_4px_9px_-4px_#3b71ca]
            transition duration-150
            ease-in-out hover:bg-red-600
            hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            focus:bg-red-600 
            focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
            focus:outline-none focus:ring-0 active:bg-red-700 
            active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
            dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"

                >
                  {/* {isLoading ? <Loadingbtn /> : "Add New City"} */}
                  delete
                </button>

                <button
                  type="submit"
                  className="block bg-blue-700
                // w-[min(calc(100vw-2.5rem),rem)]
            mx-auto h-fit
            rounded bg-primary px-2 text-xs
            py-1  font-medium
            uppercase leading-normal
            text-white
            shadow-[0_4px_9px_-4px_#3b71ca]
            transition duration-150
            ease-in-out hover:bg-primary-600
            hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            focus:bg-primary-600 
            focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
            focus:outline-none focus:ring-0 active:bg-primary-700 
            active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
            dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light" onClick={() => {
                    setEdit(true)
                    setOpen(true)
                    setId(item._id)
                    setCity(item.value)
                  }}>
                  edit
                </button>


              </span> </div>
          </motion.div>
        ))
      }

    </div>
  )
}

export default Cities