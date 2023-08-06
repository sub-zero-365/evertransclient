import { Heading } from "./"
const Footer = () => {
  return (
    <footer class="bg-neutral-900 2xl:container mx-auto dark:bg-slate-900 mt-10  text-center text-white py-20">
      <div>


      </div>
      <div className="mb-12 px-6 t grid grid-cols-2 md:grid-cols-3 text-white lg:grid-cols-4">

        {
          Array.from({ length: 10 }, (arr, index) => {
            return (
              <div>
                <Heading text="Contact us"
                  className="!text-blue-500
                !font-black  !text-start !text-xl !mb-4 !pl-0 " />
                <ul className="pl-2 space-y-2 mb-6 ">
                  <li className="text-white text-start">
                    Middle Farms Limbe
                  </li>
                  <li className="text-white text-start">
                    Middle Farms Limbe
                  </li>
                </ul>

              </div>
            )
          })
        }


      </div>
      <div >
        <img
          className="mx-auto"
          src="https://afrique-con.com/templates/curb_appeal/images/s5_logo.png" />
      </div>
      <div
        class="p-4 text-center"
      >
        © 2023 Copyright:
        <a class="text-white" href="https://tailwind-elements.com/">{process.env.REACT_APP_APP_NAME}</a>
      </div>
    </footer>
  )
}

export default Footer