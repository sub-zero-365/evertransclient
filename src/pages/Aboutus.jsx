import { Footer } from "../components"
// import { possibility } from "../Assests/images"
import { NavLink } from 'react-router-dom'
const Aboutus = () => {
  return (
    <>
      <div className="mx-auto container">
        <div className="lg:px-10 ">



          <nav className="flex mb-5 mt-5 px-5 " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-[0.1rem] md:space-x-3">
              <li className="inline-flex items-center">
                <NavLink to={"/"} href="#" className="flex items-center text-xs font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  Home
                </NavLink>
              </li>
              <li>
                <div className="flex items-center">
                  <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    <h1 className="text-slate-400  font-medium text-lg ">About us</h1>

                  </a>
                </div>
              </li>

            </ol>
          </nav>

          <h1 className="mb-4 text-xl font-extrabold leading-6
                 tracking-tight- px-5 text-gray-900 md:text-2xl 
                 lg:text-4xl dark:text-white max-w-3xl">
            {/* sothin here */}
          </h1>



          <div className="container- text-sm  md:text-lg items-center space-y-10 mx-0 bg-slate-200  text-white dark:text-white flex flex-col   md:flex-row md:mx-auto md:px-[2rem] shadow  pb-[100px] pt-[2.5rem] md:pt-[8.125rem] lg:px-[4rem]">

            <div className="flex-1">

              <p className="mb-3 text-gray-500 px-4 dark:text-black first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-black first-letter:mr-3 first-letter:float-left">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
              <p className="text-gray-500  dark:text-black px-4">Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate critical development work, eliminate toil, and deploy changes with ease, with a complete audit trail for every change.</p>


            </div>
            <div className="flex-1">
              <img src="https://www.volusion.com/assets/images/index/webp/customer-rep.webp" alt="user" className="h-full w-full object-fill max-h-[500px]" />

            </div>
          </div>
          <div>

            <div className="container my-10 px-6 mx-auto text-sm md:text-base">

              <section className="mb-32 text-gray-800 dark:text-white">
                <div className="flex justify-center">
                  <div className="text-center max-w-[700px]">
                    <h2 className="text-2xl font-bold mb-6">Who are we?</h2>
                    <p className="text-gray-500 mb-12">
                      The Afrique con group has just been founded in 2016 but created by many years of experience.
                      Our founders have gained servere knowledge of the public transport sector when working for other companies.
                      We understand the challenges of transportation in Africa and we see the possibilities, we like to do things different on our own way by being proactive and inovative.

                      Afrique con is committed to develop public transportation in West Africa and to provide you with safe and fast possibilities to travel.
                      Travelling with us is not only going from "a to b" - It is a great experience you need to enjoy.

                      Our ambition is to become the largest African public transportation company with domestic and internalional lines and be the first choice for all travellers.

                      We are operating international bus lines between Cameroon and Nigeria with a possibility to travel to Benin, Togo, Ivory Coast, Senegal and Mali right from our Akwa-Douala Terminal. And we furthermore operate domestic bus line in Cameroon between the cities of Douala, Younde, Buea and Limbe.
                      All our lines are served with luxerious and comfortable vehicles.

                      Afrique Con is connecting Africa in Comfort.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 xl:gap-x-12">
                  <div className="mb-8">
                    <div className="flex">
                      <div className="shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                          </path>
                        </svg>
                      </div>
                      <div className="grow ml-4">
                        <p className="font-bold mb-1">Support 24/7</p>
                        <p className="text-gray-500">Pellentesque mollis, metus nec fringilla aliquam</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex">
                      <div className="shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                          </path>
                        </svg>
                      </div>
                      <div className="grow ml-4">
                        <p className="font-bold mb-1">Tracking</p>
                        <p className="text-gray-500">Magna lacus iaculis elit, quis pharetra varius.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex">
                      <div className="shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                          </path>
                        </svg>
                      </div>
                      <div className="grow ml-4">
                        <p className="font-bold mb-1">Reporting</p>
                        <p className="text-gray-500">Pellentesque varius ex vel consequat quis.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex">
                      <div className="shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                          </path>
                        </svg>
                      </div>
                      <div className="grow ml-4">
                        <p className="font-bold mb-1">Analytics</p>
                        <p className="text-gray-500">Vestibulum gravida iaculis nisl, vel lobortis eros.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex">
                      <div className="shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                          </path>
                        </svg>
                      </div>
                      <div className="grow ml-4">
                        <p className="font-bold mb-1">Huge community</p>
                        <p className="text-gray-500">Praesent vulputate lacus bibendum augue .</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex">
                      <div className="shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                          </path>
                        </svg>
                      </div>
                      <div className="grow ml-4">
                        <p className="font-bold mb-1">Easy to use</p>
                        <p className="text-gray-500">Sed mauris ex, imperdiet sit amet nisl ac, ultrices.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex">
                      <div className="shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                          </path>
                        </svg>
                      </div>
                      <div className="grow ml-4">
                        <p className="font-bold mb-1">Frequent updates</p>
                        <p className="text-gray-500">Aenean lectus ex, placerat id tellus in eros.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex">
                      <div className="shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                          </path>
                        </svg>
                      </div>
                      <div className="grow ml-4">
                        <p className="font-bold mb-1">Responsive</p>
                        <p className="text-gray-500">Donec consequat orci quis volutpat imperdiet.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>

          </div>
          <section className="bg-white dark:bg-gray-900">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
              <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white">We didn't reinvent the wheel</h2>
                <p className="mb-4">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
                <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
                <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
              </div>
            </div>
          </section>






          {/* <div className="py-10 bg-slate-100 px-5">
                    <h1 className="mb-6 text-3xl font-extrabold leading-none
                tracking-tight px-5 text-gray-900 md:text-5xl mt-5 lg:text-6xl dark:text-black max-w-5xl text-center md:text-start">
                        OUR STORY </h1>

                        <p className="mb-3 text-gray-500  dark:text-black">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
<div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">
    <p className="mb-3 text-gray-500  dark:text-black">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
    <blockquote className="mb-3">
        <p className="text-xl italic font-semibold text-gray-900 dark:text-white-">" Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application. "</p>
    </blockquote>
</div>
<p className="mb-3 text-gray-500 dark:text-black">Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate critical development work, eliminate toil, and deploy changes with ease, with a complete audit trail for every change.</p>

                </div> */}





        </div>

      </div>
      <Footer />

    </>
  )
}

export default Aboutus