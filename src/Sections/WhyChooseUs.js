import footerbg from '../Assets/images/fooote-bg.jpg'
import { Heading } from '../components'
import { motion } from "framer-motion"
import AnimatedText from '../components/AnimateText'
const WhyChooseUs = () => {
    return (
        <section className='relative text-white overflow-x-hidden'>
            <img className="absolute -z-0  inset-0 w-full h-full "
                src={footerbg}
            />
            <div className='py-24 h-full px-4 lg:px-10   z-1 bg-[#1a1f6f] relative
       bg-opacity-80'>

                <div
                    className='lg:grid grid-cols-2 items-end'
                >
                    <div className='max-w-2xl'>
                        <Heading
                            className="!text-[#ffae02] !font-semibold !text-2xl"
                            text="WHY CHOOSE US"
                        />
                        <AnimatedText
                            amount={0.6}
                            className='!text-3xl !text-start lg:!text-5xl !leading-[1.3]  !font-semibold  '
                            text="Riding with us, your satisfaction is guaranteed!"
                            inView
                        />

                        <p
                            className='py-10 leading-normal text-lg'
                        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4 lg:gap-y-6'>
                            <div className='flex gap-x-4'>
                                <div className='flex-none '>
                                    <motion.div
                                        whileHover={{
                                            y: -8
                                        }}
                                        className=' w-14 h-14 rounded-sm
                                        left-0 !sticky lg:sticky top-16  bg-[#ffae02]'
                                    >

                                    </motion.div>

                                </div>
                                <div className='flex-1'>
                                    <Heading
                                        className="!font-semibold !text-white !text-2xl !pl-0 !m-0 !mb-2.5"
                                        text="On Time & Punctual"
                                    />
                                    <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                </div>
                            </div>
                            <div className='flex gap-x-4'>
                                <div className='flex-none '>
                                    <motion.div
                                        whileHover={{
                                            y: -8
                                        }}
                                        className=' w-14 h-14 rounded-sm
                                        left-0 !sticky lg:sticky top-16  bg-[#ffae02]'
                                    >

                                    </motion.div>

                                </div>
                                <div className='flex-1'>
                                    <Heading
                                        className="!font-semibold !text-white !text-2xl !pl-0 !m-0 !mb-2.5"
                                        text="Proffessional Drivers"
                                    />
                                    <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                </div>
                            </div>
                            <div className='flex gap-x-4'>
                                <div className='flex-none '>
                                    <motion.div
                                        whileHover={{
                                            y: -8
                                        }}
                                        className=' w-14 h-14 rounded-sm
                                        left-0 !sticky lg:sticky top-16  bg-[#ffae02]'
                                    >

                                    </motion.div>

                                </div>
                                <div className='flex-1'>
                                    <Heading
                                        className="!font-semibold !text-white !text-2xl !pl-0 !m-0 !mb-2.5"
                                        text="Safety And Security"
                                    />
                                    <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                </div>
                            </div>
                            <div className='flex gap-x-4'>
                                <div className='flex-none '>
                                    <motion.div
                                        whileHover={{
                                            y: -8
                                        }}
                                        className=' w-14 h-14 rounded-sm
                                        left-0 !sticky lg:sticky top-16  bg-[#ffae02]'
                                    >

                                    </motion.div>

                                </div>
                                <div className='flex-1'>
                                    <Heading
                                        className="!font-semibold !text-white !text-2xl !pl-0 !m-0 !mb-2.5"
                                        text="Well Maintenance"
                                    />
                                    <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 100, x: 0 }}
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{ duration: 2 }}
                        className='pt-24'>
                        <div className='ml-auto  relative  bg-white w-fit rounded-sm p-8  '>
                            <span
                                className='flex-none block w-2 bg-orange-400 h-full absolute left-0 top-0'
                            />

                            <Heading
                                className="!pl-0 !text-[#181e8f] !font-black"
                                text="We Provide Best Bus For You"
                            />
                            <p
                                className='text-black !text-lg max-w-[16rem]'
                            >Quis arcu phasellus hac penatibus vivamus maximus.</p>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs