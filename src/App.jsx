import { Navbar ,Loader} from "./components";
import { Home, Login, Register, Booking, BusSits, CheckOut, CheckOutInfo, NotFound, AdminLogin } from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import DashBoadLayout from "./components/DashboardLayout"
const ContactUs = lazy(() => import("./pages/Contact"));
const Aboutus = lazy(() => import("./pages/Aboutus"));

function App() {
  return (
    <div className="bg-color_light  dark:bg-color_dark dark:text-white"
      onTouchStart={e => e.preventDefault()}
      onTouchMove={e => e.preventDefault()}

    >
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/bussits/:id" element={<BusSits />} />
            {/* <Route path="/checkout" element={<CheckOut />} /> */}
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<Aboutus />} />
            <Route path="/information" element={<CheckOutInfo />} />
            <Route path="/auth" element={<AdminLogin />} />
            <Route path="/dashboard" element={<DashBoadLayout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>

  );
}

export default App;
