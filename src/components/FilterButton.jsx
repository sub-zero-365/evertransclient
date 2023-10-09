import {useSearchParams} from "react-router-dom"
import { useFilter } from '../Hooks/FilterHooks'
import UiButton from './UiButton'

const FilterButton = ({
className,
...props}) => {
const {handleFilterChange}=useFilter()
const [querySearch]=useSearchParams()
    const { value } = props
    const isSelected = value === querySearch.get(props.name)
    return (
      <UiButton
        onClick={() => handleFilterChange(props.name, value)}
        className={`${className} !px-8 !py-2.5 !flex-none !uppercase ${isSelected && "!bg-green-900 !rounded-lg"}`}
      > {props.label}</UiButton>

    )

  }

export default FilterButton