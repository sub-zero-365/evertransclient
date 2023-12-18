import { useSearchParams } from "react-router-dom"
import { useFilter } from '../Hooks/FilterHooks'
import UiButton from './UiButton'

const FilterButton = ({
  className, children,
  ...props }) => {
  const { handleFilterChange } = useFilter()
  const [querySearch] = useSearchParams()
  const { value } = props
  const isSelected = value == querySearch.get(props.name)
  return (
    <UiButton
      type={props.type}
      onClick={() => handleFilterChange(props.name, value)}
      className={`${className} !px-8
        !text-black
        !py-2.5 !flex-none
        !text-xs lg:!text-xs 
        bg-transparent !border
        !outline-none
        !uppercase 
        !shadow-none
        dark:!text-white
        dark:bg-slate-600
      hover:!text-white
        !rounded-lg
        ${isSelected && "!bg-green-900 dark:!bg-slate-950 gold:!bg-color_gold gold:!text-black font-medium !text-white !rounded-lg"}`}
    > {props.label || children}</UiButton>

  )

}

export default FilterButton