import React from 'react'
import { useState, useEffect } from 'react'
import generateRandonNumber from '../utils/generateRandonCharacters'
const InputBox = ({ inputRef, value, onChange, name,type }) => {
    const [inputid, setInputId] = useState(null)
    
    useEffect(() => {
        setInputId(generateRandonNumber())
    }, [])
    return (
        <div className="relative mb-6" data-te-input-wrapper-init>
            <input ref={inputRef}
                onChange={onChange}
                type={type ??"text"}
                className="peer block min-h-[auto] w-full 
rounded 
border-2
focus:border-2
focus:border-blue-400
valid:border-blue-400
bg-transparent
px-3 py-[0.32rem]
leading-[2.15] 
outline-none
transition-all 
duration-200
ease-linear
focus:placeholder:opacity-100
data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id={inputid}
                placeholder="Full Names" required />
            <label
                htmlFor={inputid}
                className="pointer-events-none 
absolute left-3
top-0 mb-0
max-w-[90%]
origin-[0_0]
truncate 
pt-[0.37rem] 
leading-[2.15]
text-neutral-500
transition-all duration-200  
ease-out 
peer-focus:-translate-y-[1.15rem]
peer-focus:scale-[0.8]
peer-valid:scale-[0.8]
peer-valid:text-blue-400
peer-valid:-translate-y-[1.15rem]
peer-focus:text-blue-400
peer-focus:bg-white
peer-valid:bg-white
dark:peer-focus:bg-slate-800
dark:peer-valid:bg-slate-800
px-0
bg-transparent
peer-data-[te-input-state-active]:-translate-y-[1.15rem]
rounded-sm
peer-data-[te-input-state-active]:scale-[0.8]
motion-reduce:transition-none
dark:text-neutral-200
dark:peer-focus:text-primary"

            >
                {name}
            </label>
        </div>
    )
}

export default InputBox