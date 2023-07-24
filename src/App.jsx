import { lazy, Suspense } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from 'react'
import axios from "axios"
import { UserLayout, DashboardLayout, ProtectedRoute } from "./components";
import { Home, Auth, SingleTicket } from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
const ContactUs = lazy(() => import("./pages/Contact"));
const Seat = lazy(() => import("./pages/Seats"));
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
const DashboardHome = lazy(() => import("./pages/DashBoardHome"));
const AdminAssistant = lazy(() => import("./pages/AdminContact"));
const Details = lazy(() => import("./pages/userDetails"));
const SeatDetails = lazy(() => import("./pages/SeatDetails"));
const DashRegister = lazy(() => import("./pages/DashRegister"));
const BusDetails = lazy(() => import("./pages/BusDetails"));
const FindBus = lazy(() => import("./pages/FindBus"));
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_LOCAL_URL
function App() {
  return (
    <div className="bg-color_light  dark:bg-color_dark dark:text-white"
    >
      <BrowserRouter>
        <Suspense fallback={<div className="h-screen w-full
          bg-slate-300 dark:bg-slate-900 bg-opacity-75  flex items-center justify-center">    <div class="lds-roller">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>}>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute />}>

                <Route path="bus" element={<FindBus />} />
                <Route path="booking" element={<Booking />} />
                <Route path="bussits/:id" element={<BusSits />} />
                <Route path="information" element={<CheckOutInfo />} />
                <Route path="user" element={<UserBoard />} />
                <Route path="user/:id" element={<SingleTicket />} />

              </Route>
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="about-us" element={<Aboutus />} />
              <Route path="auth" element={<Auth />} />
              <Route path="seat/:id" element={<SeatDetails />} />
              <Route path="seat" element={<Seat />} />
            </Route>
            <Route path="/dashboard"
              element={<DashboardLayout />} >
              <Route index element={<DashboardHome />} />
              <Route path="tickets" element={<Appointment />} />
              <Route path=":id" element={<SingleTicket />} />
              <Route path="cities" element={<Cities />} />
              <Route path="users" element={<Users />} />
              <Route path="bus" element={<Bus />} />
              <Route path="details/:id" element={<Details />} />
              <Route path="assistant" element={<AdminAssistant />} />
              <Route path="bus/:id" element={<BusDetails />} />
              <Route path="seat/:id" element={<SeatDetails />} />
              <Route path="seat" element={<Seat />} />
              <Route path="routes" element={<BusRoutes />} />
              <Route path="register" element={<DashRegister />} />
            </Route>
            <Route
              path="*"
              element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </div>

  );
}

export default App;
