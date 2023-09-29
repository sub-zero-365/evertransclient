import { lazy, Suspense } from 'react'
import {
  ToastContainer
} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useEffect, useState } from 'react'
import axios from "axios"
import { UserLayout, DashboardLayout, ProtectedRoute } from "./components";
import { Home, Auth, SingleTicket } from "./pages";
import {
  BrowserRouter,
  Routes, Route
  , RouterProvider,
  createBrowserRouter
}
  from 'react-router-dom'
import { ErrorElement } from './components'
// import ContactLayout from "./pages/ContactLayout"
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
import Assist from "./pages/Assistant.user"
import { loader as findBusLoader } from "./pages/FindBus"
import { loader as busSitLoader } from "./pages/BusSits"
import { loader as checkOutLoader, action as checkOutAction } from './pages/CheckOutInfo'
import { loader as loginLoader, action as loginAction } from './pages/Login'
import { loader as protectLoader } from "./components/ProtectedRoute"
import { loader as singleTicketLOader } from "./pages/SingleTicket"
import { loader as singleSeatLoader } from "./pages/SeatDetails"
import { loader as dashboardLayoutLoader } from "./components/DashboardLayout"
import { loader as ticketsloader } from "./pages/Appointment"
import { loader as usersLoader } from "./pages/Users"
import { loader as userLoader } from "./pages/userDetails"
import { loader as seatsLoader } from "./pages/Seats"
import { loader as ticketsLoader } from "./pages/UserBoard"
import { loader as busLoader } from "./pages/Bus"
import { loader as singleBusLoader, action as singleBusAction } from "./pages/BusDetails"
import { loader as assistantsLoader } from "./pages/Assistant"
import { loader as securityLoader } from "./pages/SecurityPage"
import { loader as editSingleLoader } from "./pages/EditSingleTicket"
import { action as findBusAction } from './pages/FindBusSingle'
import { loader as busesSingleLoader, action as editTicketAction } from "./pages/BusesSingle"
import SingleTicketErrorElement from './components/SingleTicketErrorElement'
import EditSingleTicket from './pages/EditSingleTicket'
import DashboardHome from "./pages/DashBoardHome"
import axios from "axios"
const FallBack = () => (<div className="h-screen w-full
bg-slate-300 dark:bg-slate-900 bg-opacity-75  flex items-center justify-center">    <div class="lds-roller">
    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</div>)
const queryClient = new QueryClient()
const ContactUs = lazy(() => import("./pages/Contact"));
const FindBusSingle = lazy(() => import("./pages/FindBusSingle"))
const BusesSingle = lazy(() => import("./pages/BusesSingle"))
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
const Details = lazy(() => import("./pages/userDetails"));
const SeatDetails = lazy(() => import("./pages/SeatDetails"));
const BusDetails = lazy(() => import("./pages/BusDetails"));
const FindBus = lazy(() => import("./pages/FindBus"));
axios.defaults.withCredentials = true;
axios.defaults.baseURL="https://evertrans.onrender.com"
const checkDefaultTheme = () => {
  return false
  if (localStorage.theme === 'dark' || (
    window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    return true
  } else {
    document.documentElement.classList.remove('dark')
    return true
  }

};
const isDarkThemeEnabled = checkDefaultTheme();
const router = createBrowserRouter([
  {
    element:
      <UserLayout
        isDarkThemeEnabled={isDarkThemeEnabled}

      />
    ,
    errorElement: <ErrorElement

    />,

    children: [
      {
        element: <Home

        />,
        index: true,
      },

      {
        element:
          <Suspense fallback={<FallBack />}>
            <Login />
          </Suspense>
        ,
        path: "login",
        loader: loginLoader,
        action: loginAction(queryClient)
      }
      ,
      {
        element:
          <Suspense fallback={<FallBack />}>
            <Auth />
          </Suspense>
        ,
        path: "auth",
        loader: loginLoader,
        action: loginAction(queryClient)
      }
      ,
      {
        element: <ProtectedRoute
          queryClient={queryClient}
          isDarkThemeEnabled={isDarkThemeEnabled}
        />,
        loader: protectLoader(queryClient),
        children: [

          {
            element:
              <Suspense fallback={<FallBack />}>
                <Booking />
              </Suspense>
            ,
            path: "booking"

          },
          {
            element:

              <Suspense fallback={<FallBack />}>
                <FindBus />
              </Suspense>
            ,
            path: "bus",
            loader: findBusLoader(queryClient)
          },
          {
            element:
              <Suspense fallback={<FallBack />}>
                <BusSits />
              </Suspense>
            ,
            path: "bussits/:id",
            loader: busSitLoader(queryClient)
          },
          {
            element:
              <Suspense fallback={<FallBack />}>
                <CheckOutInfo />
              </Suspense>
            ,
            path: "information",
            loader: checkOutLoader,
            action: checkOutAction(queryClient)
          },
          {
            element:
              <Suspense fallback={<FallBack />}>
                <UserBoard />
              </Suspense>

            ,
            loader: ticketsLoader(queryClient),
            path: "user",

          },
          {
            element:
              <Suspense fallback={<FallBack />}>
                <SingleTicket />
              </Suspense>
            ,
            path: "user/:id",
            loader: singleTicketLOader(queryClient),
            errorElement: <SingleTicketErrorElement />

          },
          {
            element:
              <Suspense fallback={<FallBack />}>
                <EditSingleTicket />
              </Suspense>
            ,
            path: "user/edit/:id",
            loader: editSingleLoader(queryClient),
            errorElement: <SingleTicketErrorElement />,
            children: [
              {
                index: true,
                element: <Suspense>
                  <FindBusSingle />
                </Suspense>,
                action: findBusAction
              },
              {
                path: "buses",
                element: <Suspense>
                  <BusesSingle />
                </Suspense>,
                loader: busesSingleLoader(queryClient),
                action: editTicketAction(queryClient)
              },
            ]

          },
          {
            element:
              <Suspense fallback={<FallBack />}>
                <Seat />
              </Suspense>
            ,
            path: "seat",
            loader: seatsLoader(queryClient),
            errorElement: <SingleTicketErrorElement />

          },
          {
            element:
              <Suspense fallback={<FallBack />}>
                <SeatDetails />
              </Suspense>
            ,
            path: "seat/:id",
            loader: singleSeatLoader(queryClient),
            errorElement: <SingleTicketErrorElement />

          },



        ]
      }

      ,
      {
        path: "about-us",
        element: <Suspense fallback={<FallBack />}>
          <Aboutus />
        </Suspense>
      }
      ,
      {
        path: "contact-us",
        element: <Suspense fallback={<FallBack />}>
          <ContactUs />
        </Suspense>
      }
      ,
      {
        path: "*",
        element:
          <Suspense fallback={<FallBack />}>
            <NotFound />
          </Suspense>
      }
    ]
  },
  {

    path: "dashboard",
    element: <DashboardLayout
      isDarkThemeEnabled={isDarkThemeEnabled}
    />,
    children: [
      {
        index: true,
        element:
          <DashboardHome />,
        loader: dashboardLayoutLoader(queryClient),
      },
      {
        path: "tickets",
        element: <Suspense>
          <Appointment />
        </Suspense>,
        loader: ticketsloader(queryClient),
      },
      {
        path: "users",
        element: <Suspense>
          <Users />
        </Suspense>,
        loader: usersLoader(queryClient),
      },
      {
        path: "details/:id",
        element: <Suspense>
          <Details />
        </Suspense>,
        loader: userLoader(queryClient),
      },
      {
        path: "bus",
        element: <Suspense>
          <Bus />
        </Suspense>,
        loader: busLoader(queryClient),
      },
      {
        path: "bus/:id",
        element: <Suspense>
          <BusDetails />
        </Suspense>,
        loader: singleBusLoader(queryClient),
        action: singleBusAction(queryClient),
        errorElement: <SingleTicketErrorElement />

      },
      {
        path: "assistants",
        element: <Suspense>
          <Assistant />
        </Suspense>,
        loader: assistantsLoader(queryClient),
        action: singleBusAction(queryClient),
        errorElement: <SingleTicketErrorElement />

      },
      {
        path: "security",
        element: <Suspense>
          <Security />
        </Suspense>,
        loader: securityLoader(queryClient),
        action: singleBusAction(queryClient),
        errorElement: <SingleTicketErrorElement />

      },
      {
        element:
          <Suspense fallback={<FallBack />}>
            <Seat />
          </Suspense>
        ,
        path: "seat",
        loader: seatsLoader(queryClient),
        errorElement: <SingleTicketErrorElement />

      },
      {
        element:
          <Suspense fallback={<FallBack />}>
            <SeatDetails />
          </Suspense>
        ,
        path: "seat/:id",
        loader: singleSeatLoader(queryClient),
        errorElement: <SingleTicketErrorElement />

      },
    ]

  }, {
    path: "assistant",
    element: <Assist />,
    children: [
      {
        path: ":id",
        element:
          <Suspense>
            < SingleTicket />,
          </Suspense>,
        loader: singleTicketLOader(queryClient),
      }

    ]


  }

]
)
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}

        />
        {/* <Suspense fallback={<div className="h-screen w-full
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
    </Suspense> */}
      </QueryClientProvider>
      <ToastContainer />
    </>

  )
}

export default App;
