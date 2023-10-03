import React from 'react'
import ReactSelect from "react-select"
import { useFilter } from '../Hooks/FilterHooks'


const style = {
    control: (base, state) => {
        // console.log(state.isFocused)
        return ({
            ...base,
            boxShadow: "none",
            backgroundColor: "transparent",
            borderRadius: 0,
            fontSize: 1 + "rem",
            cursor: "pointer",
            // backgroundColor: state.isSelected ? "red" : "green"
        }
        )
    }


}
const CustomSelect = ({ options, defaultValues, keyValue }) => {
    const { handleChange } = useFilter()
    return (
        <ReactSelect
            onChange={e => handleChange(e, keyValue)}
            options={options}
            styles={style} />

    )
}

export default CustomSelect