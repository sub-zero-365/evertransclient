import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
const IncrementDecrementButton =
    ({
        decreement = () => 0,
        increement = () => 0,
        total = 0,
        className=""

    }) => {
        return (
            <div
                className={`${className} flex border space-x-3  items-center  px-4 py-1.5 rounded-full   `}
            >
                <span>
                    <AiOutlineMinus
                        onClick={decreement}
                        size={16}
                    />
                </span>
                <span>{total}</span>
                <span>
                    <AiOutlinePlus
                        onClick={increement}
                        size={16}
                    />
                </span>
            </div>
        )
    }

export default IncrementDecrementButton