import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"; //this is for using rounting & we can say in html anker tag
import "./App.css";
import { Menu } from "./MenuSction/MenuPartiels/Menu";
import { Home } from "./Home";
import { Help } from "./HelpSection/Help";
import { HelpLegal } from "./HelpSection/HelpLegal";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Navbar } from "./Navbars/Navbar";
import { Footer } from "./Footer/Footer";
import { Cart } from "./Cart/Cart";
import { Ourspecial } from "./ourSpecial/Ourspecial";
import AOS from "aos";
import "aos/dist/aos.css";
import { Product } from "./Product/Product";

function App() {
  //  animation by default setting i set it
  AOS.init({
    offset: 300,
    delay: 200,
  });
  // console.log(url);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<Product />} />
          <Route path="/help" element={<Help />} />
          <Route path="/help/legal" element={<HelpLegal />} />
          <Route path="/user-login" element={<Login />} />
          <Route path="/user-register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/our-special" element={<Ourspecial />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
