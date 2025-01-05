// import axios from "axios";
import { lazy, Suspense } from 'react';
import {
  ToastContainer
} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { DashboardLayout, ProtectedRoute, UserLayout } from "./components";
// import RestaurantLayout from "./components"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import "core-js/features/array/at";
import 'react-datepicker/dist/react-datepicker.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import { ErrorElement } from './components';
import { loader as dashboardLayoutLoader } from "./components/DashboardLayout";
import { loader as protectLoader } from "./components/ProtectedRoute";
import SingleTicketErrorElement from './components/SingleTicketErrorElement';
import { Auth, Home, SingleTicket } from "./pages";
import { action as newSeatAction, loader as newSeatloader } from "./pages/AddNewBusPage";
import { action as addProductAction } from "./pages/AddProduct";
import { loader as AdminMailsLoader } from "./pages/AdminMailStat";
import { loader as mainticketsloader } from "./pages/Appointment";
import { loader as assistantsLoader } from "./pages/Assistant";
import Assist, { action as logoutAction, loader as singleAssistantLoader } from "./pages/Assistant.user";
import { loader as ticketsLoader } from "./pages/Books";
import { loader as busLoader } from "./pages/Bus";
import { action as singleBusAction, loader as singleBusLoader } from "./pages/BusDetails";
import { loader as busesSingleLoader, action as editTicketAction } from "./pages/BusesSingle";
import { loader as busSitLoader } from "./pages/BusSits";
import { action as checkOutAction, loader as checkOutLoader } from './pages/CheckOutInfo';
import { loader as citiesLoader, action as cityActions } from "./pages/Cities";
import { loader as customerStatsloader } from "./pages/CustomerStats";
import DashboardHome from "./pages/DashBoardHome";
import { action as carAction } from "./pages/EditBusPage";
import EditSingleTicket, { loader as editSingleLoader } from './pages/EditSingleTicket';
import { ErrorFindBus, loader as findBusLoader } from "./pages/FindBus";
import { action as findBusAction } from './pages/FindBusSingle';
import { action as loginAction, loader as loginLoader } from './pages/Login';
import Mailing from './pages/Mailing';
import { action as mailingAction } from "./pages/MailingPreview";
import { loader as mailsLoader } from "./pages/Mails";
import { action as routesActions, loader as routesLoader } from "./pages/RoutesPage";
import { action as singleSeatAction, loader as singleSeatLoader } from "./pages/SeatDetails";
import { action as seatAction, loader as seatsLoader } from "./pages/Seats";
import { loader as securityLoader } from "./pages/SecurityPage";
import { action as editSingleMailAction, loader as singleMailLoader } from "./pages/SingleMail";
import { loader as singleTicketLOader } from "./pages/SingleTicket";
import { loader as singleuserLoaderticket } from "./pages/UserDetailsTicket";
import { action as usersAction, loader as usersLoader } from "./pages/Users";
import {loader as singleUserMailQuery} from "./pages/UserDetailsMail"
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MailingForm from './components/MailingForm';
import MailingPreview from './pages/MailingPreview';
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
const Suspended = lazy(() => import("./pages/Suspended"));
const Assistant = lazy(() => import("./pages/Assistant"));
const UserDetailsTicket = lazy(() => import("./pages/UserDetailsTicket"))
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
const Restaurant = lazy(() => import("./pages/Restaurant"));
const NewBusPage = lazy(() => import("./pages/AddNewBusPage"));
const ProductPage = lazy(() => import("./pages/Product"));
const RestaurantUserPage = lazy(() => import("./pages/RestaurantUser"));
const ShoppingBagPage = lazy(() => import("./pages/ShoppingBag"));
const CheckOutPage = lazy(() => import("./pages/CheckOut"));
const AddProductPage = lazy(() => import("./pages/AddProduct"));
const SingleRecieptPage = lazy(() => import("./pages/SingleReciept"));
const ProductPreviewPage = lazy(() => import("./pages/ProductPreviewPage"));
const UserDetailsMail = lazy(() => import("./pages/UserDetailsMail"));
// axios.defaults.withCredentials = true;
const setTheme = (theme) => {
  document.documentElement.className = ""
  document.documentElement.classList.add(theme)
  document.documentElement.setAttribute("data-theme", theme)
  return theme
}
const checkDefaultTheme = () => {
  if (localStorage.theme === 'dark'
  ) {
    return setTheme("dark")

  } else if (localStorage.theme === 'light') {

    return setTheme("light")
  }
  else if (localStorage.theme === 'gold') {

    return setTheme("gold")
  }
  else {
    if ((
      window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return setTheme("dark")
    } else {
      return setTheme("light")
    }
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
      }
      , {
        element: <Suspense
          fallback={<FallBack />}
        >
          <Suspended />

        </Suspense>
        , path: "suspended"

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
            errorElement: <ErrorFindBus />

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
            action: checkOutAction(queryClient),
            errorElement: <SingleTicketErrorElement />,

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
              // {
              //   element:
              //     <Suspense fallback={<FallBack />}>
              //       <RestaurantUserPage />
              //     </Suspense>
              //   ,
              //   path: "restaurant",
              //   errorElement: <SingleTicketErrorElement />,
              //   loader: restaurantuserloader(queryClient)

              // },
            ]

          },
          // {
          //   path: "restaurant",
          //   element: <Suspense>
          //     <Restaurant />
          //   </Suspense>
          // },
          {
            path: "shopping-bag",
            element: <Suspense>
              <ShoppingBagPage />
            </Suspense>
          },
          {
            path: "checkout",
            element: <Suspense>
              <CheckOutPage />
            </Suspense>
          },
          {
            path: "product/:id",
            element: <Suspense>
              <ProductPage />
            </Suspense>
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
          // {
          //   path: "user/reciept/:id",
          //   element: <Suspense>
          //     <SingleRecieptPage />
          //   </Suspense>,
          //   loader: singleRecieptLoader(queryClient)
          // },
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
            action: singleSeatAction(queryClient),
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
            action: newSeatAction(queryClient)

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
        loader: mainticketsloader(queryClient),
      },

      {
        path: "product/add",
        element: <Suspense>
          <AddProductPage />
        </Suspense>,
        loader: addProductAction(queryClient),
      },
      {
        path: "product/preview",
        element: <Suspense>
          <ProductPreviewPage />
        </Suspense>,
        // loader: addProductAction(queryClient),
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
        loader: AdminMailsLoader(queryClient)
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

        children: [
          {
            index: true,
            loader: singleuserLoaderticket(queryClient),
            element: <Suspense>
              <UserDetailsTicket />
            </Suspense>
          },
          {
            // index: true,
            loader:singleUserMailQuery(queryClient),
            path: "mailer",
            element: <Suspense>
              <UserDetailsMail />
            </Suspense>
          },


        ],


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
        action: singleSeatAction(queryClient),
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
        action: newSeatAction(queryClient)

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
    errorElement: <ErrorElement
    />,
    children: [
      {
        path: ":id",
        element:
          <Suspense>
            < SingleTicket read_only />,
          </Suspense>,
        errorElement: <SingleTicketErrorElement />,
        loader: singleTicketLOader(queryClient),

      },
      // {
      //   element:
      //     <Suspense fallback={<FallBack />}>
      //       <SingleMail />
      //     </Suspense>
      //   ,
      //   path: "mail/:id",
      //   loader: singleMailLoader(queryClient),
      //   errorElement: <SingleTicketErrorElement />

      // },

    ]


  }

]
)

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient} >
        <RouterProvider
          router={router}
        />
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
      <ToastContainer />
    </>

  )
}

export default App;
