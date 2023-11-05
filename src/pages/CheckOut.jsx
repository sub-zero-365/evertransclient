import React from 'react'
import Heading from '../components/Headings'
import IncrementDecrementButton from '../components/IncrementDecrementButton'
import cartItems, { removeFromCart, increaseItem, decreaseItem } from '../actions/cartItems'
import { useDispatch, useSelector } from 'react-redux'
// import Accordians from '../components/Accordians'
import { Link } from 'react-router-dom'
import Input from '../components/InputBox'

const CheckOut = () => {
    const dispatch = useDispatch()
    const { cartItem, amount, total } = useSelector(state => state.cartItems)

    const incrementCounter = (id) => {
        dispatch(increaseItem(id))
    }
    const decrementCounter = (id) => {
        dispatch(decreaseItem(id))
    }
    const ShopCart = ({ _id: id, total, product_price, product_imgUrl, product_name, cancel_price }) => <div
        className='flex justify-between gap-x-2 items-center mb-1 select-none'

    >
        <div className='flex-none '>
            <img
                className='h-20 w-20 border '
                alt={product_name}
                src={
                    product_imgUrl ??
                    'https://weed.com/wp-content/uploads/2021/07/DELTA-8-THC-VAPE-CARTRIDGE-WEDDING-CAKE-1.jpg'}
            />
        </div>
        <div className='flex-1 flex flex-col '>
            <Heading
                className="!text-[1rem] !text-start lg:!font-light !font-light !leading-tight"
                text={product_name ?? "n/a"}
            />
            <IncrementDecrementButton
                increement={() => incrementCounter(id)}
                decreement={() => decrementCounter(id)}
                total={total}
                className='w-fit'
            />

        </div>
        <div className='flex-none flex flex-col'>
            <Heading className={"!text-lg"} text={product_price * total} />
            <Heading className={"!text-lg"} text={(cancel_price?.toFixed(1) || 1) * total} />
        </div>
    </div>
    return (
        <div className='max-h-screen overflow-y-auto'>

            <div
                className='flex lg:items-start flex-col lg:flex-row justify-between w-full max-w-6xl mx-auto'
            >
                <div
                    className='flex-1 px-3 lg:max-w-screen-xl border lg:sticky top-4 '
                >
                    <Heading
                        className="!text-xl !text-start !mb-0 !pb-1 !font-semibold "
                        text="INFORMATION"

                    />
                    <p className='mb-6'>Already have an account with us? <Link to={"/auth"}>Log in</Link>.
                    </p>
                    <Input
                        className="!max-w-sm "
                        placeHolder="email address"
                        name="email address"
                    />
                    <div className='flex items-center gap-x-2 py-2 mb-5'>
                        <input id={`createaccount`} type="checkbox" value="" class="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 " />
                        <label
                            htmlFor='createaccount'
                        >
                            Create {process.env.REACT_APP_APP_NAME ?? "evergreen.com"} shopping account.</label>
                    </div>
                    <Heading
                        className="!text-xl !text-start !mb-0 !pb-1 !font-semibold "
                        text="SHIPPING ADDRESS"

                    />
                    <div className='grid gap-x-4 grid-cols-12'>
                        <Input
                            className="!max- col-span-12 lg:col-span-6"
                            placeHolder="email address"
                            name="first name"
                        />
                        <Input
                            className="!max- col-span-12 lg:col-span-6"
                            placeHolder="email address"
                            name="last name"
                        />
                        <Input
                            className="!max- col-span-12"
                            placeHolder="email address"
                            name="street address"
                        />
                    </div>
                </div>
                <div
                    className='w-[min(calc(100%-10px),30rem)] py-10 px-5 lg:px-6 bg-[#f8f8f8]'
                >
                    <Heading
                        className="!text-xl !text-start !mb-0 !pb-1 !font-semibold "
                        text="YOUR CART"

                    />
                    <hr
                        className='h-0.5 bg-[#eee] '
                    />
                    {
                        cartItem.map((arr) => <ShopCart
                            {...arr}
                            key={arr._id} />)
                    }


                    <div
                        className='flex justify-between items-center'
                    >
                        <p>Subtotal</p>
                        <Heading
                            className={"!text-sm !font-semibold"}
                            text={`$${amount}`}
                        />
                    </div>
                    {/* <Accordians text="shopping " text2={"calculate price"}>
                        ashdifhoasjdf asdfnskonsdaf fighsadoidfh isadhf iladsjhfijdh jiduifgs diu
                    </Accordians> */}

                    <div
                        className='flex justify-between items-center'
                    >
                        <p>Tax</p>
                        <Heading
                            className={"!text-sm  !font-normal"}
                            text={`Taxes will be calculated at checkout`}
                        />
                    </div>
                    <div
                        className='flex justify-between items-center'
                    >
                        <p>Total</p>
                        <Heading
                            className={"!text-xl !font-semibold"}
                            text={`$${amount}`}
                        />
                    </div>

                </div>


            </div>
            <div
                className='h-screen'
            />
        </div>
    )
}

export default CheckOut