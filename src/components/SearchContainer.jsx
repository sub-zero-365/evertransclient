import React from 'react'
import { useSearchContext } from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useFilter } from '../Hooks/FilterHooks'
// import { useFilter } from '../hooks/useFilter'
const SeachContainer = () => {
    const navigate = useNavigate()
    const { setSeach, search, focusRef, setToggle } = useSearchContext()
    const { handleFilterChange } = useFilter()

    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                setToggle(false)
                navigate(`/product-category/${search || "no"}?search=${search}`)
            }}
            className='form-group flex-1   '>

            <input required
                autoComplete={false}
                spellCheck={false}
                value={search}
                ref={focusRef}
                onChange={(e) => {
                    const value = e.target.value
                    setSeach(value)
                    handleFilterChange("search", value)
                }}

                placeholder='Search For Products ...'
                className='w-full flex-1 outline-none   px-4 rounded-sm min-h-[45px] text-xs lg:text-sm '
            />
        </form>
    )
}

export default SeachContainer