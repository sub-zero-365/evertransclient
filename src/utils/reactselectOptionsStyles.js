export const style = {
    control: base => ({
      ...base,
      border: 0,
      borderBottom: "1px solid black",
      boxShadow: "none",
      background: "transparent",
      color: "red",
      borderRadius: 0,
      fontSize: 1 + "rem"
    }
    )

  }
  
  export const components =(indicator)=>({ DropdownIndicator: () => indicator?indicator:null, IndicatorSeparator: () => null })