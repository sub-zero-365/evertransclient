import React, { useEffect, useRef, useState } from 'react'
import Heading from '../components/Headings'
import { Form, Link, useActionData, useSearchParams,redirect } from 'react-router-dom'
import Input from '../components/InputBox'
import Button from '../components/UiButton'
import CategorySelect from '../components/CategorySelect'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { toast } from 'react-toastify'
import LoadingButton from '../components/LoadingButton'
import customFetch from "../utils/customFetch"
// import ReactStars from '../components/ReactStars'
// import { AnimatePresence, motion } from 'framer-motion'
export const action = (queryClient) => async ({ request, params }) => {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        console.log("this is form data", data);
        return null
        await customFetch.post("/products/new", data)
        // this will invalidate the todos that matches this query 
        // using the exact keyword
        return null
        await queryClient.invalidateQueries({
            queryKey: ['products'],
            exact: true
        })
        return redirect("/dashboard/products")
    } catch (err) {
        console.log("this is the error", err)
        toast.error(err?.response?.data?.msg)
        return (err?.response?.data?.msg || "something went wrong!! try again later")
    }


}

const AddProductPage = () => {
    const focusRef = useRef(null)
    const [searchParams] = useSearchParams()
    const rdFrom = searchParams.get("rd_from") === "product_page"
    useEffect(() => {
        var timer = null
        if (rdFrom) {
            focusRef.current?.focus();
            timer = setTimeout(() => {
                // when the redirect from the product the user will be redirect to this page
                // if there is redirect in the rd_fromand and it is equal to product_page
                // after a second it will replace the content of the url to the page removing the rd_from on the url
                window.history.replaceState({}, null, "/dashboard/addproduct")
                clearTimeout(timer)
            }, 1000);
        }
        return () => clearTimeout(timer)//clear the timer to for efficient code
    }, [])
    const fileRef = useRef(null)
    const [imgArr, setImgUrl] = useState([])
    const deleteImg = (index) => {
        const temp = imgArr
        temp.splice(index, 1)
        setImgUrl([
            ...temp
        ])
    }
    const handleFileChange = () => {
        const files = fileRef.current.files
        console.log(fileRef.current.files.length)
        if (imgArr && imgArr.length > 3) {
            toast.warning("you can add just 4 photos")
            return
        }
        const temp = []
        for (let file of files) {
            console.log(`this is a file at any time`, file)
            // const file = fileRef.current.files[0]
            temp.push(file)
            // if (!file) return
        }
        setImgUrl([
            ...imgArr, ...temp
        ])

    }



    return (
        <div className='flex-1 w-full py-4 h-[calc(100vh-4rem)] overflow-y-auto scrollto '>

            <nav class="flex px-5" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <Link to="/dashboard" class="inline-flex items-center">
                        <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Dashboard
                        </a>
                    </Link>
                    <Link to="/dashboard/products" class="inline-flex items-center">
                        <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            Products
                        </a>
                    </Link>

                    <li aria-current="page">
                        <div class="flex items-center">
                            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Product Page</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className='lg:px-5  bg-white px-2  py-5 rounded-lg max-w-5xl mx-auto'>
                <Heading
                    className="!text-xl !font-semibold !text-start"
                    text="Add Product"
                />
                <Form method='POST'
                    className='  grid grid-cols-1 gap-y-4 lg:grid-cols-2 gap-x-5  items-start '
                >
                    <div
                        className='border rounded-lg px-2 py-2 lg:sticky lg:top-2  '
                    >
                        <div>
                            <input type='file'
                                name="files"
                                ref={fileRef}
                                multiple
                                id='main-image'
                                accept="image/jpeg, image/png, image/jpg"
                                className='hidden'
                                onChange={handleFileChange}

                            />
                            <label
                                htmlFor="main-image"
                            >

                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAVXZhlM-qA4bg_bOHRutl3wQVQdAbSWx_A&usqp=CAU'
                                    alt="inputimage"
                                />
                            </label>
                        </div>
                        <div className=''>
                            {/* <AnimatePresence> */}

                                {
                                    imgArr.map((img, index) =>
                                        <>
                                            <div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.4 }}
                                                key={`${img?.name}--${img?.size}`}
                                                className='flex px-4 py-4
                                justify-between 
                                mb-3 items-center 
                                gap-x-2 border rounded-lg bg-slate-50'
                                            >
                                                <img
                                                    className='flex-none w-16 h-14'
                                                    src={URL.createObjectURL(img)}
                                                />
                                                <div classNamme="flex-1  overflow-hidden ">
                                                    <Heading
                                                        className="!text-sm line-clamp-1 !text-start"
                                                        text={img?.name
                                                        }
                                                    />
                                                    <Heading
                                                        className="!text-sm line-clamp-1 !text-start"
                                                        text={`${(img?.size / 1024).toFixed(1)} kb`
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className='flex-none'
                                                >
                                                    <RiDeleteBin6Line
                                                        className='cursor-pointer'
                                                        onClick={() => deleteImg(index)}
                                                        size={25}
                                                    />
                                                </div>
                                            </div>
                                        </>

                                    )
                                }

                            {/* </AnimatePresence> */}

                        </div>
                        {

                            imgArr?.length > 0 && <Button
                                onClick={() => setImgUrl([])}
                                title="Delete All "
                                type="button"
                                className="!block !py-2.5 lg:!py-3.5 mx-auto
                            w-[25rem] max-w-[calc(100%-20px)]
                            !mt-5 !bg-rose-800 !rounded-lg "
                            />
                        }

                    </div>
                    <div
                        className='border rounded-lg
                        mt-10 lg:mt-0
                        lg:px-4 py-5 lg:sticky lg:top-2 bg-white relative z-1 px-3 '

                    >


                        <div className='form-group'>
                            <Heading
                                className="!text-sm !p-0 !mb-2 !text-start"
                                text="Product Name"
                            />
                            <Input className="!mb-3"
                                ref={focusRef}

                                show={false}
                                name="product_name"
                            />
                        </div>
                        <div className='form-group'>
                            <Heading
                                className="!text-sm !p-0 !mb-2 !text-start"
                                text="Product Price"
                            />
                            <Input className="!mb-3"
                                show={false}
                                name="product_price"
                            />
                        </div>
                        <div className='form-group'>
                            <Heading
                                className="!text-sm !p-0 !mb-2 !text-start"
                                text="Product imgUrl"
                            />
                            <Input className="!mb-3"
                                show={false}
                                name="product_imgUrl"
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <Heading
                                className="!text-sm !p-0 !mb-2 !text-start"
                                text="Product Category"
                            />
                            <CategorySelect />
                        </div>
                        <div className='form-group mb-3'>

                            <label for="message" class="block mb-2">  <Heading
                                className="!text-sm !p-0 !mb-2 !text-start"
                                text="Description"
                            /></label>
                            <textarea id="message" rows="4" class="block p-2.5 w-full  dark:text-black text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-whitee dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your description here..."></textarea>

                        </div>
                        <div>
                            <Heading
                                className="!text-sm !p-0 !mb-1 !text-start"
                                text="Product Star"
                            />

                            {/* <ReactStars
                                name={"product_rating"}
                            /> */}
                        </div>
                        <div
                            className='flex gap-x-2 justify-end  flex-wrap !ml-auto'

                        >

                            <Button
                                title="Preview"
                                type="button"
                                className="!block  !mt-5 !bg-green-800 !rounded-lg "
                            />
                            <LoadingButton
                                message="publishing ..."
                                type="submit"
                                title="Publish"
                                className="!block  !mt-5 !rounded-lg "
                            />

                        </div>


                    </div>
                </Form>

            </div>
        </div>
    )
}

export default AddProductPage