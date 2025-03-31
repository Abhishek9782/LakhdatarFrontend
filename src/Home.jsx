import React, { Suspense, lazy } from "react";

const Navbarbg = lazy(() => import("./NavbarBg/Navbarbg"));
const Offers = lazy(() => import("./Offers/Offers"));
const Featuredproducts = lazy(() =>
  import("./FeaturedProducts/Featuredproducts")
);
const TableRegisteration = lazy(() =>
  import("./TableRegistration/TableRegisteration")
);
const RestaurantMenu = lazy(() => import("./RestaurantMenu/RestaurantMenu"));
const CustomerFeedback = lazy(() =>
  import("./CustomerFeedback/CustomerFeedback")
);
const BestChef = lazy(() => import("./BestChelf/BestChef"));
const Location = lazy(() => import("./Location/Location"));

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbarbg />
      </Suspense>

      <Suspense fallback={<div>Loading Offers...</div>}>
        <Offers />
      </Suspense>

      <Suspense fallback={<div>Loading Featured Products...</div>}>
        <Featuredproducts />
      </Suspense>

      <Suspense fallback={<div>Loading Table Registration...</div>}>
        <TableRegisteration />
      </Suspense>

      <Suspense fallback={<div>Loading Menu...</div>}>
        <RestaurantMenu />
      </Suspense>

      <Suspense fallback={<div>Loading Feedback...</div>}>
        <CustomerFeedback />
      </Suspense>

      <Suspense fallback={<div>Loading Best Chef...</div>}>
        <BestChef />
      </Suspense>

      <Suspense fallback={<div>Loading Location...</div>}>
        <Location />
      </Suspense>
    </div>
  );
};
export default Home;
