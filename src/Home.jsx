import React from "react";
import { Navbar } from "./Navbars/Navbar";
import { Offers } from "./Offers/Offers";
import { Featuredproducts } from "./FeaturedProducts/Featuredproducts";
import { TableRegisteration } from "./TableRegistration/TableRegisteration";
import { RestaurantMenu } from "./RestaurantMenu/RestaurantMenu";
import { CustomerFeedback } from "./CustomerFeedback/CustomerFeedback";
import { BestChef } from "./BestChelf/BestChef";
import { Location } from "./Location/Location";
import { Footer } from "./Footer/Footer";
import { Navbarbg } from "./NavbarBg/Navbarbg";

export const Home = () => {
  return (
    <div>
      <Navbarbg />
      <Offers />
      <Featuredproducts />
      <TableRegisteration />
      <RestaurantMenu />
      <CustomerFeedback />
      <BestChef />
      <Location />
      {/* <Footer /> */}
    </div>
  );
};
