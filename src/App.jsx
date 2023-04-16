// import './App.css';
import { Navbar } from "./components";
import { Home,Login,Register,Booking, BusSits } from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
  <div className="bg-color_light  dark:bg-color_dark dark:text-white">
    <BrowserRouter>
        <Navbar />
    
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/bussits/:id" element={<BusSits/>}/>
      </Routes>
    </BrowserRouter>
  </div>
    
  );
}

export default App;
