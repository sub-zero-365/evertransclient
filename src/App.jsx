import { Navbar, Loader, UserLayout, DashboardLayout } from "./components";
import { Home, Login, Register, Booking, BusSits, CheckOut, CheckOutInfo, NotFound, AdminLogin,UserBoard } from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Provider} from 'react-redux'
import store from "./store";

const ContactUs = lazy(() => import("./pages/Contact"));
const Aboutus = lazy(() => import("./pages/Aboutus"));
const Appointment = lazy(() => import("./pages/Appointment"));
function App() {
  return (
    <div className="bg-color_light  dark:bg-color_dark dark:text-white"
    >
      <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
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
              <Route path="auth" element={<AdminLogin />} />
              <Route path="user" element={<UserBoard />} />
            </Route>
            {/* dashboardlayout here  */}
            <Route path="/dashboard" element={<DashboardLayout />} >
              <Route index  element={<Appointment/>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </Provider>
      </BrowserRouter>
    </div>

  );
}

export default App;
