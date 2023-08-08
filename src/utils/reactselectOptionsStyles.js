export const style = {
  control: base => ({
    ...base,
    border: 0,
    borderBottom: "1px solid black",
    boxShadow: "none",
    background: "transparent",
    borderRadius: 0,
    fontSize: 1 + "rem",
    cursor: "pointer"
  }
  )

}

export const components = (indicator) => ({ DropdownIndicator: () => indicator ? indicator : null, IndicatorSeparator: () => null })