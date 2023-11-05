import React, { useState } from 'react';
import Select from 'react-select';
// import { colourOptions } from '../data';
const categoryOptions = [
    {
        value: "cannabis",
        label: "cannabis"
    },
    {
        value: "crackers",
        label: "crackers"
    },
    {
        value: "drugs",
        label: "drugs"
    },
    {
        value: "marijuana",
        label: "marijuana"
    },
    {
        value: "platinum",
        label: "platinum"
    },
    {
        value: "balder crimson",
        label: "balder crimson"
    },
    {
        value: "vapes",
        label: "vapes"
    },
]

export default () => {
    const handleChange = (e) => {
        const value = e?.map(({ value }) => value).join("-")
        setValue(value)
    }
    const [value, setValue] = useState("cannabis")
    return (
        <>
            <input
                name="product_category"
                type='hidden'
                value={value}
            />
            <Select
                defaultValue={[categoryOptions[0]]}
                isMulti
                name="drugsoptions"
                onChange={handleChange}
                options={categoryOptions}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </>

    )
}

