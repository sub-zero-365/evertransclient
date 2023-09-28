import React from 'react'
import { Heading } from '../components'

const ChooseTheBus = () => {
    return (
        <div>
            <div
                className='md:grid grid-cols-12 gap-4 items-center container mx-auto'
            >
                <div className='col-span-5'>
                    <h3>why choose the bus</h3>
                    <h1
                        className='text-center text-4xl text-[#181e76] lg:text-5xl font-semibold px-4 py-5'
                    >
                        Get on the road with our bus rental
                    </h1>

                </div>
                <div className='col-span-7'>

                    <p>
                        Sed ornare mi rhoncus iaculis elementum elit maximus. Ex facilisis suspendisse velit donec eget nulla venenatis habitasse maecenas conubia urna. Duis imperdiet bibendum velit ligula aptent tempus sed semper pede donec. Odio bibendum dolor malesuada elementum nunc hac vitae lorem rhoncus hendrerit eros.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default ChooseTheBus