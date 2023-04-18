import { Navbar } from "./components";
import { Home,Login,Register,Booking, BusSits,CheckOut, CheckOutInfo,NotFound } from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Notfound from "d:/ecommerce-app/src/pages/notfound/notfound";
function App() {
  return (
  <div className="bg-color_light  dark:bg-color_dark dark:text-white" 
  
  onTouchStart={e=>e.preventDefault()}
  onTouchMove={e=>e.preventDefault()}
  
  
  >
    <BrowserRouter>
        <Navbar />
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/bussits/:id" element={<BusSits/>}/>
      <Route path="/checkout" element={<CheckOut/>}/>
      <Route path="/information" element={<CheckOutInfo/>}/>
      <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  </div>
    
  );
}

export default App;
