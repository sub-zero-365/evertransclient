import { lazy, Suspense } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useEffect, useState } from 'react'
import axios from "axios"
import { UserLayout, DashboardLayout, ProtectedRoute } from "./components";
import { Home, Auth, SingleTicket } from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContactLayout from "./pages/ContactLayout"

import 'react-datepicker/dist/react-datepicker.css'
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import "swiper/css/a11y"
import "swiper/css/scrollbar"
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "core-js/features/array/at";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ScrollTo from "./withRouter"

const queryClient = new QueryClient()
const ContactUs = lazy(() => import("./pages/Contact"));
const Seat = lazy(() => import("./pages/Seats"));
const Assistant = lazy(() => import("./pages/Assistant"));
const Bus = lazy(() => import("./pages/Bus"));
const Aboutus = lazy(() => import("./pages/Aboutus"));
const BusRoutes = lazy(() => import("./pages/Routes"));
const Appointment = lazy(() => import("./pages/Appointment"));
const CheckOutInfo = lazy(() => import("./pages/CheckOutInfo"));
const UserBoard = lazy(() => import("./pages/UserBoard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Booking = lazy(() => import("./pages/Booking"));
const BusSits = lazy(() => import("./pages/BusSits"));
const Cities = lazy(() => import("./pages/Cities"));
const Users = lazy(() => import("./pages/Users"));
const Security = lazy(() => import("./pages/SecurityPage"))
const DashboardHome = lazy(() => import("./pages/DashBoardHome"));
// const AdminAssistant = lazy(() => import("./pages/AdminContact"));
const Details = lazy(() => import("./pages/userDetails"));
const SeatDetails = lazy(() => import("./pages/SeatDetails"));
const DashRegister = lazy(() => import("./pages/DashRegister"));
const BusDetails = lazy(() => import("./pages/BusDetails"));
const FindBus = lazy(() => import("./pages/FindBus"));
const Assist = lazy(() => import("./pages/Assistant.user"));

axios.defaults.withCredentials = true;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = process.env.REACT_APP_LOCAL_URL
  // dev code
} else {
  // production code
  axios.defaults.baseURL = process.env.REACT_APP_PROD_URL

}


function App() {
  const [darkTheme, setDarkTheme] = useState(false)
  const changeTheme = () => {
    if (!darkTheme) {
      localStorage.setItem("theme", "dark")
    } else {
      localStorage.setItem("theme", "white")
    }
    document.documentElement.classList.toggle('dark')
    setDarkTheme(c => !c)
  }
  const toggleDarkTheme = () => {
    changeTheme()

  }
  useEffect(() => {
    if (localStorage.theme === 'white') {
      setDarkTheme(false)
      return
    }
    else if (localStorage.theme === 'dark' || (
      window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDarkTheme(true)

    } else {
      document.documentElement.classList.remove('dark')
      setDarkTheme(false)

    }
  }, [])
  return (
    <div className=""
    >
      <BrowserRouter>
        <ScrollTo />

        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div className="h-screen w-full
          bg-slate-300 dark:bg-slate-900 bg-opacity-75  flex items-center justify-center">    <div class="lds-roller">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>}>
            <Routes>

              <Route path="/" element={<UserLayout

                toggleDarkTheme={toggleDarkTheme}
                darkTheme={darkTheme}
              />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="/" element={<ProtectedRoute />}>
                  <Route path="bus" element={<FindBus />} />
                  <Route path="booking" element={<Booking />} />
                  <Route path="bussits/:id" element={<BusSits />} />
                  <Route path="information" element={<CheckOutInfo />} />
                  <Route path="user/:id" element={<SingleTicket />} />
                  <Route path="user" element={<UserBoard />} />
                  <Route path="seat" element={<Seat />} />
                  <Route path="seat/:id" element={<SeatDetails />} />


                </Route>


                <Route path="contact-us" element={<ContactUs />} />
                <Route path="about-us" element={<Aboutus />} />
                <Route path="auth" element={<Auth />} />
              </Route>
              <Route path="/dashboard"

                element={<DashboardLayout

                  toggleDarkTheme={toggleDarkTheme}
                  darkTheme={darkTheme}

                />} >
                <Route index element={<DashboardHome />} />
                <Route path="tickets" element={<Appointment />} />
                <Route path=":id" element={<SingleTicket />} />
                <Route path="cities" element={<Cities />} />
                <Route path="users" element={<Users />} />
                <Route path="bus" element={<Bus />} />
                <Route path="details/:id" element={<Details />} />
                {/* <Route path="assistant" element={<AdminAssistant />} /> */}
                <Route path="bus/:id" element={<BusDetails />} />
                <Route path="seat/:id" element={<SeatDetails />} />
                <Route path="seat" element={<Seat />} />
                <Route path="routes" element={<BusRoutes />} />
                <Route path="register" element={<DashRegister />} />
                <Route path="assistants" element={<Assistant />} />
                <Route path="contacts" element={<ContactLayout />}>
                </Route>
                <Route path='security' element={<Security />} />
                
              </Route>
              <Route path="assistant"
                element={<Assist />}>
                <Route path=":id" element={<SingleTicket />} />
              </Route>

              <Route
                path="*"
                element={<NotFound />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>

  );
}

export default App;
