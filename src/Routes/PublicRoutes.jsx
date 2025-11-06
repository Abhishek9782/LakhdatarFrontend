import React from "react";
import { Route } from "react-router-dom";
import { lazy } from "react";

// Lazy load public components
const Home = lazy(() => import("../Home"));
const Menu = lazy(() => import("../MenuSction/MenuPartiels/Menu"));
const Product = lazy(() => import("../Product/Product"));
const Help = lazy(() => import("../HelpSection/Help"));
const HelpLegal = lazy(() => import("../HelpSection/HelpLegal"));
const OurSpecial = lazy(() => import("../ourSpecial/Ourspecial"));
const PageNotFound = lazy(() => import("../PageNotFound/PageNotFound"));
const UserLayout = lazy(() => import("../layout/UserLayout"));

const PublicRoutes = [
  <Route
    key="home"
    path="/"
    element={
      <UserLayout>
        <Home />
      </UserLayout>
    }
  />,
  <Route
    key="menu"
    path="/menu"
    element={
      <UserLayout>
        <Menu />
      </UserLayout>
    }
  />,
  <Route
    key="product"
    path="/menu/:id"
    element={
      <UserLayout>
        <Product />
      </UserLayout>
    }
  />,
  <Route
    key="help"
    path="/help"
    element={
      <UserLayout>
        <Help />
      </UserLayout>
    }
  />,
  <Route
    key="help-legal"
    path="/help/legal"
    element={
      <UserLayout>
        <HelpLegal />
      </UserLayout>
    }
  />,
  <Route
    key="our-special"
    path="/our-special"
    element={
      <UserLayout>
        <OurSpecial />
      </UserLayout>
    }
  />,
  <Route
    key="404"
    path="*"
    element={
      <UserLayout>
        <PageNotFound />
      </UserLayout>
    }
  />,
];

export default PublicRoutes;
