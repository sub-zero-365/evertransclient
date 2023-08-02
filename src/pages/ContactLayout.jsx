import { Outlet } from 'react-router-dom'
// import 
import { Heading } from "../components"
import { useState } from 'react'
import { motion } from 'framer-motion'
const ContactLayout = () => {
    const [main, setMain] = useState(false)
    const UserInfo = ({ }) => {
        return (
            <div

                onClick={() => setMain(true)}
                className="border border-pink-950 mx-4 p-2 rounded-lg mb-2 shadow bg-white ">
                <div className="flex items-center">
                    <span className="w-fit border-pink-950 font-bold">
                        FE
                    </span>
                    <Heading text="user name " className="!text-sm !mb-1 !font-semibold !flex-1" />
                    <Heading text="user name " className="!text-sm !mb-1 !font-semibold w-fit flex-none" />

                </div>
                <div className="font-poppins px-4">
                    iuhashf sdf suaidhf asdf hasdif sadijfh iasddjsak dfsadg fiuasd gsdfgfg sadifugas dg
                </div>
                <div className="flex items-center">
                    <Heading text="bateemma14gmail.com " className="!text-sm !mb-1 !font-semibold !flex-1" />
                    <Heading text="672303030" className="!text-sm !mb-1 !font-semibold w-fit flex-none" />
                </div>
            </div>
        )

    }
    return (
        <div className="!flex-1 overflow-hidden h-[calc(100vh-60px)] border container mx-auto overflow-y-auto pb-24">
            <div className="flex ">
                <motion.div
                 
                    transitions={{ duration: 4 }}
                    className="!flex-none w-full lg:w-[400px] relative  border ">
                    {

                        Array.from({ length: 10 }, (arr, index) => {
                            return (
                                <UserInfo />
                            )
                        })
                    }
                </motion.div>
                <motion.div
               
                    className="flex-1">
                    main screen here
                </motion.div>


            </div>

        </div>
    )

}
export default ContactLayout