import './loader.css'
const Load = ({toggle,dark}) => {
  return (
  <div className={`fixed h-screen
  w-full top-0 left-0 z-[40] flex items-center justify-center ${dark?"bg-opacity-100":"bg-opacity-25"}  bg-slate-900 ${toggle?"block":"hidden"}`}>
    <div class="lds-roller">
    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
    
  )
}

export default Load