import { useSearchParams } from "react-router-dom"
import { useFilter } from '../Hooks/FilterHooks'
import UiButton from './UiButton'

const FilterButton = ({
  className,
  ...props }) => {
  const { handleFilterChange } = useFilter()
  const [querySearch] = useSearchParams()
  const { value } = props
  const isSelected = value === querySearch.get(props.name)
  return (
    <UiButton
      onClick={() => handleFilterChange(props.name, value)}
      className={`${className} !px-8
        !text-black
        !py-2.5 !flex-none
        !text-xs lg:!text-xs 
        bg-transparent !border
        !uppercase 
        !shadow-none
        dark:!text-white
      
        !rounded-lg
        ${isSelected && "!bg-green-900 text-white !rounded-lg"}`}
    > {props.label}</UiButton>

  )

}

export default FilterButton