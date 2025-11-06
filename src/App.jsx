import React, { Suspense } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Themes
import { theme } from "./theme/index";
import { vendorTheme } from "./theme/vendorTheme";
import { adminTheme } from "./theme/admintheme";

// Main Router
import AppRouter from "./routes/AppRouter";

// Loading Component
import LoadingSpinner from "./components/common/LoadingSpinner";

// Theme Wrapper Component
const ThemeWrapper = ({ children }) => {
  const location = useLocation();

  const getTheme = () => {
    if (location.pathname.startsWith("/vendor")) return vendorTheme;
    if (
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/lakhdatar/admin")
    )
      return adminTheme;
    return theme;
  };

  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      delay: 100,
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <Router>
      <ThemeWrapper>
        <Suspense fallback={<LoadingSpinner />}>
          <Box
            sx={{ minHeight: "100vh", backgroundColor: "background.default" }}
          >
            <AppRouter />

            {/* Global Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />

            <Toaster
              position="bottom-center"
              reverseOrder={false}
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
              }}
            />
          </Box>
        </Suspense>
      </ThemeWrapper>
    </Router>
  );
}

export default React.memo(App);
