import { Footer } from '../components'
import { NavLink } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import { Heading } from "../components"
const ContactUs = () => {
  return (
    <div class="container   mt-10 md:px-6 mx-auto">
      {/* <Alert toggle setToggle={()=>0} message={"Thanks for submitting your contact info"} /> */}
      <nav class="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NavLink to={"/"} href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              Home
            </NavLink>
          </li>
          <li>
            <div class="flex items-center">
              <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Contact us</h1>

              </a>
            </div>
          </li>

        </ol>
      </nav>


      <section
        className="md:grid grid-cols-2 space-y-10 md:space-x-5
        justify-start
        items-center px-4 container mx-auto pb-24 "
      >
        <div className="">
          <img
            src="http://afrique-con.com/images/bus.jpg"
            className=""
          />
        </div>
        <div>
          <div>
            <Heading text="For customers" className="!mb-2 !font-black !text-xl !pl-0 !text-center md:!text-start" />
            <p className="text-sm ">
              Customers and passengers can contact the national customer service centre for the country of departure by telephone or by sending an e-mail to support@afrique-con.com for any questions, lost items and ticket reservations.
              You may also visit the local customer service desk located at our main terminals in Douala, Yaoundé, Buea and Ikom.
            </p>

          </div>
          <div>
            <Heading text="For customers" className="!mb-2 !font-black !text-xl !pl-0 !text-center md:!text-start" />
            <p className="text-sm ">
              Customers and passengers can contact the national customer service centre for the country of departure by telephone or by sending an e-mail to support@afrique-con.com for any questions, lost items and ticket reservations.
              You may also visit the local customer service desk located at our main terminals in Douala, Yaoundé, Buea and Ikom.
            </p>

          </div>

        </div>

      </section>


      <div className="py-5 bg-slate-400 text-center  rounded-sm mb-10">
        <Heading text="We are connecting Africa in comfort" className="!mb-0 !text-2xl" />
      </div>

      <section
        className="md:grid grid-cols-2  space-y-10 md:space-x-5
        justify-start
        items-start px-4 container mx-auto pb-10"
      >
        <div className="order-last">
          <img
            src="http://afrique-con.com/images/bus.jpg"
            className=""
          />
        </div>
        <div>
          <div>
            <Heading text="Buea" className="!mb-2 !font-black !text-xl !pl-0 !text-center md:!text-start" />
            <p className="text-sm ">
              Mile 17
            </p>
            <p className="text-sm ">
              near WDC Aparthotel
            </p>
            <p className="text-sm ">
              Buea.
              +237 692830465 <br />
              +237 678197346<br />
              +237 678197353<br />
            </p>

          </div>


        </div>

      </section>
      <section
        className="md:grid grid-cols-2  space-y-10 md:space-x-5
        justify-start
        items-start px-4 container mx-auto pb-10"
      >
        <div className="">
          <img
            src="http://afrique-con.com/images/bus.jpg"
            className=""
          />
        </div>
        <div>
          <div>
            <Heading text="Buea" className="!mb-2 !font-black !text-xl !pl-0 !text-center md:!text-start" />
            <p className="text-sm ">
              Mile 17
            </p>
            <p className="text-sm ">
              near WDC Aparthotel
            </p>
            <p className="text-sm ">
              Buea.
              +237 692830465 <br />
              +237 678197346<br />
              +237 678197353<br />
            </p>

          </div>


        </div>

      </section>

      {/* jiohfoiashdokfh ads f */}
      <section class="mb-5 text-gray-800 md:grid grid-cols-2">
        <div>

          <h1 class="mb-4 text-xl font-extrabold leading-none max-w-4xl tracking-tight px-5 text-gray-900 md:text-3xl lg:text-4xl dark:text-white">We wish to get back to  <span class="text-blue-600 dark:text-blue-500">you</span> </h1>
          <p class="text-sm md:text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 px-5 mb-6 max-w-2xl">Here at {process.env.REACT_APP_MY_APP_NAME} we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

          <h1 class="mb-4 px-5 text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl max-w-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Send An email or Click our Social Icons</span> to get to us</h1>
          <div className="flex items-center gap-3 px-4 my-6 mb-5 justify-center md:justify-start  cursor:pointer">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              fill="currentColor"
              style={{ "color": "#128c7e" }}

              viewBox="0 0 24 24">
              <path
                d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>

            <svg
              class="h-7 w-7"
              fill="currentColor"
              viewbox="0 0 24 24"
              style={{ "color": " #0084ff" }}
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd">
              <path
                d="M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111 0-6.136-5.373-11.111-12-11.111zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              fill="currentColor"
              style={{ "color": "#333" }}
              viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              fill="currentColor"
              style={{ "color": "#1877f2" }}
              viewBox="0 0 24 24">
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>


          </div>

        </div>

        <div class="container text-gray-800 px-4">
          <div class="block rounded-lg shadow-lg py-10 md:py-12 px-2 md:px-6"
            style={{ background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(30px)" }}>
            <div class="flex flex-wrap">
              <div class="grow-0 shrink-0 basis-auto w-full xl:w-5/12 px-3 lg:px-6 mb-12 xl:mb-0">
                <form>
                  <div class="form-group mb-6">
                    <input type="text" class="form-control block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7"
                      placeholder="Name" />
                  </div>
                  <div class="form-group mb-6">
                    <input type="tel" class="form-control block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7"
                      placeholder="Phone Number" />
                  </div>
                  <div class="form-group mb-6">
                    <input type="email" class="form-control block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput8"
                      placeholder="Email address" />
                  </div>
                  <div class="form-group mb-6">
                    <textarea class="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    " id="exampleFormControlTextarea13" rows="3" placeholder="Message"></textarea>
                  </div>
                  <div class="form-group form-check text-center mb-6">
                    <input type="checkbox"
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                      id="exampleCheck87" checked />
                    <label class="form-check-label inline-block text-gray-800" for="exampleCheck87">Send me a copy of this
                      message</label>
                  </div>
                  <button type="submit" class="
                    w-full
                    px-6
                    py-2.5
                    bg-blue-600
                    text-white
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out">Send</button>
                </form>
              </div>

            </div>
          </div>

        </div>
      
      </section>
      <div class="grow-0 shrink-0 basis-auto w-full xl:w-7/12">
          <div class="flex flex-wrap">
            <div class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
              <div class="flex items-start">
                <div class="shrink-0">
                  <div class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="headset" class="w-5 text-white"
                      role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor"
                        d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z">
                      </path>
                    </svg>
                  </div>
                </div>
                <div class="grow ml-6">
                  <p class="font-bold mb-1">Technical support</p>
                  <p class="text-gray-500">support@example.com</p>
                  <p class="text-gray-500">+237672301714</p>
                </div>
              </div>
            </div>
            <div class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
              <div class="flex items-start">
                <div class="shrink-0">
                  <div class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dollar-sign"
                      class="w-3 text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512">
                      <path fill="currentColor"
                        d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z">
                      </path>
                    </svg>
                  </div>
                </div>
                <div class="grow ml-6">
                  <p class="font-bold mb-1">Contact Info</p>
                  <p class="text-gray-500">Whatsapp</p>
                  <p class="text-gray-500">672301714</p>
                </div>
              </div>
            </div>
            <div class="mb-12 md:mb-0 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
              <div class="flex align-start">
                <div class="shrink-0">
                  <div class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="newspaper"
                      class="w-5 text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                      <path fill="currentColor"
                        d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z">
                      </path>
                    </svg>
                  </div>
                </div>
                <div class="grow ml-6">
                  <p class="font-bold mb-1">Socal Accounts</p>
                  <p class="text-gray-500">googlemail</p>
                  <p class="text-gray-500">{process.env.REACT_APP_MY_APP_NAME}@gmail.com</p>
                </div>
              </div>
            </div>
            <div class="grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
              <div class="flex align-start">
                <div class="shrink-0">
                  <div class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bug" class="w-5 text-white"
                      role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor"
                        d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z">
                      </path>
                    </svg>
                  </div>
                </div>
                <div class="grow ml-6">
                  <p class="font-bold mb-1">Bug report</p>
                  <p class="text-gray-500">bugs@example.com</p>
                  <p class="text-gray-500">+1 234-567-89</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="w-fit mx-auto">

        <Marquee play pauseOnClick pauseOnHover className=" text-blue-600 dark:text-blue-500 py-6 mb-4 text-xs font-extrabold leading-none  px-5 text-gray-900- md:text-lg lg:text-xl dark:text-white- max-w-5xl">
          thanks for contacting us we get back to you later or soonest
        </Marquee>

      </div>

      <Footer />
    </div>

  )

}
export default ContactUs