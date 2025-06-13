import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React, { lazy, Suspense, useEffect, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Orders from "./Orders/Orders";

// Lazy Loading Components for Faster Performance
const Menu = lazy(() => import("./MenuSction/MenuPartiels/Menu"));
const Home = lazy(() => import("./Home"));
const Help = lazy(() => import("./HelpSection/Help"));
const HelpLegal = lazy(() => import("./HelpSection/HelpLegal"));
const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Register/Register"));
const Navbar = lazy(() => import("./Navbars/Navbar"));
const Cart = lazy(() => import("./Cart/Cart"));
const Ourspecial = lazy(() => import("./ourSpecial/Ourspecial"));
const Product = lazy(() => import("./Product/Product"));
const PageNotFound = lazy(() => import("./PageNotFound/PageNotFound"));
const AdminLogin = lazy(() =>
  import("./admin/AdminPages/AdminLogin/AdminLogin")
);
const AdminProducts = lazy(() =>
  import("./admin/AdminPages/AdminProducts/AdminProducts")
);
const AdminHome = lazy(() => import("./admin/AdminPages/AdminHome/AdminHome"));
const Footer = lazy(() => import("./Footer/Footer"));

function AppContent() {
  // Optimize AOS initialization using useEffect to prevent multiple executions
  useEffect(() => {
    AOS.init({ offset: 300, delay: 200 });
  }, []);

  const location = useLocation();

  // Memoize Admin Routes Check for Performance Optimization
  const isAdminRoutes = useMemo(
    () =>
      [
        "/lakhdatar/admin/login",
        "/lakhdatar/admin/home",
        "/lakhdatar/admin/products",
      ].includes(location.pathname),
    [location.pathname]
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!isAdminRoutes && <Navbar />}
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
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Admin Routes */}
        <Route path="/lakhdatar/admin/login" element={<AdminLogin />} />
        <Route path="/lakhdatar/admin/home" element={<AdminHome />} />
        <Route path="/lakhdatar/admin/products" element={<AdminProducts />} />
      </Routes>
      {!isAdminRoutes && <Footer />}

      <ToastContainer
        position="top-right"
        closeButton={true}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </Suspense>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default React.memo(App); // Prevent unnecessary re-renders
