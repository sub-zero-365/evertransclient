import ImageSlider from "../components/ImageSlider";
import UiButton from "../components/UiButton";

const ProductPreviewPage = () => {
  return (
    <div
      className="flex-1 w-full max-w-full"
    >
      <div className="p-4">
        <div
          className="border shadow rounded-lg my-5 "
        >
          <div
            className="flex flex-col md:flex-row md:gap-x-4 gap-y-4 items-start p-5 py-10"
          >
            <div
              className="flex-none w-full md:w-[min(300px,calc(100%-1rem))]  min-h-[100px]"
            >
              <div>
                <ImageSlider />
              </div>
            </div>
            <div className="flex-1 lg:mr-4">
              <div
                className="max-w-lg px-2"
              >
                <h1 className=" md:text-start text-2xl font-manrope font-medium">Product Preview</h1>
                <h1 className="text-center md:text-start text-3xl max-w-md font-manrope font-bold">New Food Store</h1>
                <p
                  className="text-slate-600 my-4 leading-6"
                >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident consectetur voluptatem aut quasi dolorum omnis delectus magnam possimus facere eos?</p>

                <pre
                  className="my-3 leading-5 font-medium text-lg underline underline-offset-2"
                >
                  5,854fcfa
                </pre>
                <h1 className="text-center md:text-start text-3xl max-w-md font-manrope font-bold mb-2">Category</h1>

                <div className="flex flex-wrap gap-x-2 gap-y-2 mb-4">
                  {Array.from({ length: 5 },
                    (_, idx) => <div
                      key={idx}
                      className="flex-none bg-blue-300 text-sm p-2 rounded-md "
                    >food stuff ({1 + idx})</div>)}
                </div>
                <div
                  className="flex gap-4 flex-wrap"
                >
                  <UiButton>
                    Go Back
                  </UiButton>
                  <UiButton
                    className=""
                  >
                    Create Product ?
                  </UiButton>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    </div>
  )
}

export default ProductPreviewPage