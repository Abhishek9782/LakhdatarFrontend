import { Routes } from "react-router-dom";

// Route Configurations
import PublicRoutes from "./PublicRoutes";
import UserRoutes from "./UserRoutes";
import VendorRoutes from "./VendorRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {PublicRoutes}

      {/* User Routes */}
      {UserRoutes}

      {/* Vendor Routes */}
      {VendorRoutes}

      {/* Admin Routes */}
      {AdminRoutes}
    </Routes>
  );
};

export default AppRouter;
