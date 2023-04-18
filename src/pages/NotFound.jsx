import './notfound.css'
import {NavLink} from 'react-router-dom'
const Notfound = () => {
  return (
  <div className="min-h-screen">
  
  <div className="home__notfound-wrapper ">
    <div class="middle_container">
      <div class="text_404">
        <span>4</span><wbr/>
          <span>0</span><wbr/>
            <span>4</span><wbr/>
            </div>
            <div class="description">
              Oops! Seems you're lost, looking for something else?
            </div>
            <div class="buttons">
              <button id="home_btn">
              <NavLink to={"/"} style={{color:"white"}}>GO HOME</NavLink></button>
              <a href="#"><button id="contact_btn">CONTACT US</button></a>
            </div>
          </div>
  </div>
  </div>
          
          )
}

          export default Notfound