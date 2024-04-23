import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import routes from "./Routes.js";
import { EmsContext } from "../context/EmsContext";

const NavigationWeb = () => {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
};

const Navigation = () => {
  const { user } = useContext(EmsContext);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div>
      {!isLoginPage && <Navbar />}
      <div className="contentContainer">
        {!isLoginPage && <Sidebar />}
        <div className="bodyContent">
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.requiresAuth && !user ? <Login /> : <route.component />
                }
              />
            ))}
          </Routes>
        </div>
      </div>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default NavigationWeb;
