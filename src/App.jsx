import { lazy, Suspense } from 'react'
import {  useEffect } from 'react'
import axios from "axios"
import {  UserLayout, DashboardLayout } from "./components";
import { Home ,Auth,SingleTicket} from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useDispatch } from 'react-redux';

import {setUserName} from "./actions/userName"

const ContactUs = lazy(() => import("./pages/Contact"));
const Aboutus = lazy(() => import("./pages/Aboutus"));
const Appointment = lazy(() => import("./pages/Appointment"));
const CheckOutInfo =lazy(()=>import("./pages/CheckOutInfo"));
const UserBoard =lazy(()=>import("./pages/UserBoard"));
const NotFound =lazy(()=>import("./pages/NotFound"));
const Login =lazy(()=>import("./pages/Login"));
const Register =lazy(()=>import("./pages/Register"));
const Booking =lazy(()=>import("./pages/Booking"));
const BusSits =lazy(()=>import("./pages/BusSits"));
// const AdminLogin =lazy=(()=> import("./pages/AdminLogin"));
// const Auth =lazy(()=>("./pages/AdminLogin"))

function App() {
  const dispatch = useDispatch();
  const setuserName = (username) => {
dispatch(setUserName(username))

  }
  const token = localStorage.token;

  useEffect(() => {

    if (token) {
      async function getData() {

        const url = process.env.REACT_APP_LOCAL_URL + "/auth/userinfo";
        try {
          const res = await axios.get(url,{
          headers:{
            'Authorization': "makingmoney " + token
          }
          })
          console.log(res)
          const { data: { fullname,  } } = res
          // console.log(fullname, token);
          setuserName(res?.data?.user?.fullname)
    
        } catch (err) {
          console.log(err)
        }

      }
      getData()

    }
  }, [])

  return (
    <div className="bg-color_light  dark:bg-color_dark dark:text-white"
    >
      <BrowserRouter>
          <Suspense fallback={<div className="h-screen w-full bg-slate-300 dark:bg-slate-900 bg-opacity-75  flex items-center justify-center">    <div class="lds-roller">
    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
   </div>}>
            <Routes>
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="booking" element={<Booking />} />
                <Route path="bussits/:id" element={<BusSits />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="about-us" element={<Aboutus />} />
                <Route path="information" element={<CheckOutInfo />} />
                <Route path="auth" element={<Auth />} />
                <Route path="user" element={<UserBoard />} />
                <Route path="user/:id" element={<SingleTicket />} />
              </Route>
              {/* dashboardlayout here  */}
              <Route path="/dashboard" element={<DashboardLayout />} >
                <Route index element={<Appointment />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
      </BrowserRouter>
    </div>

  );
}

export default App;
