import { lazy, Suspense } from 'react'
import {
  ToastContainer
} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { UserLayout, DashboardLayout, ProtectedRoute } from "./components";
import { Home, Auth, SingleTicket } from "./pages";
import {
  RouterProvider,
  createBrowserRouter
}
  from 'react-router-dom'
import { ErrorElement } from './components'
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
import { loader as usersLoader, action as usersAction } from "./pages/Users"
import { loader as userLoader } from "./pages/userDetails"
import { loader as seatsLoader,action as seatAction } from "./pages/Seats"
import { loader as ticketsLoader } from "./pages/Books"
import { loader as busLoader } from "./pages/Bus"
import { loader as singleBusLoader, action as singleBusAction } from "./pages/BusDetails"
import { loader as assistantsLoader } from "./pages/Assistant"
import { loader as securityLoader } from "./pages/SecurityPage"
import { loader as editSingleLoader } from "./pages/EditSingleTicket"
import { action as findBusAction } from './pages/FindBusSingle'
import { loader as busesSingleLoader, action as editTicketAction } from "./pages/BusesSingle"
import { loader as singleAssistantLoader } from "./pages/Assistant.user"
import { action as mailingAction } from "./pages/MailingPreview"
import { loader as mailsLoader } from "./pages/Mails"
import { action as carAction } from "./pages/EditBusPage"
import { action as logoutAction } from "./pages/Assistant.user"
import { loader as singleMailLoader, action as editSingleMailAction } from "./pages/SingleMail"
import { loader as routesLoader, action as routesActions } from "./pages/RoutesPage"
import { loader as citiesLoader, action as cityActions } from "./pages/Cities"
import SingleTicketErrorElement from './components/SingleTicketErrorElement'
import { loader as customerStatsloader } from "./pages/CustomerStats"
import {loader as newSeatloader,action as newSeatAction} from "./pages/AddNewBusPage"
import EditSingleTicket from './pages/EditSingleTicket'
import DashboardHome from "./pages/DashBoardHome"
import Mailing from './pages/Mailing'

// import CustomerPage from './pages/CustomerPage'
import MailingForm from './components/MailingForm'
import MailingPreview from './pages/MailingPreview'
import Policy from './pages/Policy';
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
const CustomerPage = lazy(() => import("./pages/CustomerPage"));
const SingleMail = lazy(() => import("./pages/SingleMail"));
const Mails = lazy(() => import("./pages/Mails"));
const Books = lazy(() => import("./pages/Books"));
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
const Routes = lazy(() => import("./pages/RoutesPage"));
const FindBus = lazy(() => import("./pages/FindBus"));
const EditBusPage = lazy(() => import("./pages/EditBusPage"));
const UserStats = lazy(() => import("./pages/UserStats"));
const TicketStats = lazy(() => import("./pages/TicketStats"));
const MailsStat = lazy(() => import("./pages/MailsStat"));
const CustomerStats = lazy(() => import("./pages/CustomerStats"));
const AdminMailStat = lazy(() => import("./pages/AdminMailStat"));
const NewBusPage = lazy(() => import("./pages/AddNewBusPage"));
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://evertrans.onrender.com"
const checkDefaultTheme = () => {
  // if(localStorage.theme){
  // return fals
  // }
  //   else
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
        element: <Home

        />,
        index: true,
      },
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
                <CustomerPage />
              </Suspense>
            ,
            path: "customer"

          },
          {
            element:
              <Suspense fallback={<FallBack />}>
                <Mailing />
              </Suspense>
            ,
            path: "mailing",
            children: [
              {
                index: true,
                element: <MailingForm />
              },
              {
                path: "preview",
                element: <MailingPreview />,
                action: mailingAction(queryClient)
              },
            ]

          },
          {
            element:

              <Suspense fallback={<FallBack />}>
                <FindBus />
              </Suspense>
            ,
            path: "bus",
            loader: findBusLoader(queryClient),

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
            loader: checkOutLoader(queryClient),
            action: checkOutAction(queryClient)
          },
          {
            element:
              <Suspense fallback={<FallBack />}>
                <UserBoard />
              </Suspense>
            ,

            path: "user",
            children: [
              {
                index: true,
                element: <Suspense fallback={<FallBack />}>
                  <Books />
                </Suspense>,
                loader: ticketsLoader(queryClient),
              },
              {
                path: "mails",
                element: <Suspense fallback={<FallBack />}>
                  <Mails />
                </Suspense>,
                loader: mailsLoader(queryClient)
              },
            ]

          },


          {
            element:
              <Suspense fallback={<FallBack />}>
                <SingleMail />
              </Suspense>
            ,
            path: "user/mail/:id",
            loader: singleMailLoader(queryClient),
            errorElement: <SingleTicketErrorElement />,
            action: editSingleMailAction(queryClient)

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
            element: <Suspense
              fallback={<FallBack />}
            >
              <UserStats />
            </Suspense>,
            path: "user/stats",
            children: [
              {
                index: true,
                element: <Suspense
                  fallback={<FallBack />}
                >
                  <TicketStats />
                </Suspense>,
                
              },
              {
                path: "mails",
                element: <Suspense
                  fallback={<FallBack />}
                >
                  <MailsStat />
                </Suspense>,
                loader: mailsLoader(queryClient)
                
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
            errorElement: <SingleTicketErrorElement />,
            action:seatAction

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
          {
            element:
              <Suspense fallback={<FallBack />}>
                <NewBusPage />
              </Suspense>
            ,
            path: "seat/new",
            loader: newSeatloader(queryClient),
            errorElement: <SingleTicketErrorElement />,
            action:newSeatAction(queryClient)

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
        path: "policy",
        element: <Suspense fallback={<FallBack />}>
          <Policy />
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
    errorElement: <ErrorElement />,
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
        path: "customerstats",
        element: <Suspense>
          <CustomerStats />
        </Suspense>,
        loader: customerStatsloader(queryClient),
      },
      {
        path: "mails",
        element: <Suspense fallback={<FallBack />}>
          <AdminMailStat />
        </Suspense>,
        loader: mailsLoader(queryClient)
      },
      {
        element:
          <Suspense fallback={<FallBack />}>
            <SingleMail />
          </Suspense>
        ,
        path: "mail/:id",
        loader: singleMailLoader(queryClient),
        errorElement: <SingleTicketErrorElement />
      },
      {
        path: "users",
        element: <Suspense>
          <Users />
        </Suspense>,
        loader: usersLoader(queryClient),
        action: usersAction(queryClient)
      },
      {
        path: "cities",
        element: <Suspense>
          <Cities />
        </Suspense>,
        loader: citiesLoader(queryClient),
        action: cityActions(queryClient)
      },
      {
        path: "routes",
        element: <Suspense>
          <Routes />
        </Suspense>,
        loader: routesLoader(queryClient),
        action: routesActions(queryClient)
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
        action: singleBusAction(queryClient),
      },
      {
        path: "car/edit/:id",
        element: <Suspense>
          <EditBusPage />
        </Suspense>,
        loader: singleBusLoader(queryClient),
        action: carAction(queryClient)
        ,
        errorElement: <SingleTicketErrorElement />

        // action: singleBusAction(queryClient),
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
        errorElement: <SingleTicketErrorElement />,
        action: seatAction

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
      {
        element:
          <Suspense fallback={<FallBack />}>
            <NewBusPage />
          </Suspense>
        ,
        path: "seat/new",
        loader: newSeatloader(queryClient),
        errorElement: <SingleTicketErrorElement />,
        action:newSeatAction(queryClient)

      },
      {
        path: ":id",
        element:
          <Suspense>
            < SingleTicket />,
          </Suspense>,
        loader: singleTicketLOader(queryClient),
        errorElement: <SingleTicketErrorElement />
      }
    ]

  }, {
    path: "assistant",
    element: <Assist />,
    loader: singleAssistantLoader(queryClient),
    action: logoutAction(queryClient),
    children: [
      {
        path: ":id",
        element:
          <Suspense>
            < SingleTicket />,
          </Suspense>,
        errorElement: <SingleTicketErrorElement />,
        loader: singleTicketLOader(queryClient),

      },
      {
        element:
          <Suspense fallback={<FallBack />}>
            <SingleMail />
          </Suspense>
        ,
        path: "mail/:id",
        loader: singleMailLoader(queryClient),
        errorElement: <SingleTicketErrorElement />

      },

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
      </QueryClientProvider>
      <ToastContainer />
    </>

  )
}

export default App;
