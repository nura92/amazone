import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateValue } from "./components/StateProvider/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { firebaseAuth } from "./util/Firebaseconfig";
import SharedLayout from "./pages/SharedLayout";
import Home from "./components/home/Home";
import Login from "./pages/loginpage/Login";
import Chekout from "./pages/chekout/Chekout";
import Payment from "./components/payment/Payment";
import Orders from "./pages/orders/Orders";
import "./App.css";

function App() {
  const Promise = loadStripe(
    "pk_test_51NwiDNE0Z2V07ZNa1uDgWuvUTRQImGoh11oPK3YjCBL6eIjivAAgQbYkC8J2TU7sT1qVNkSNTLwiQyMjsQSrdMxc00d2TdWwB9"
  );
  const [{}, dipatch] = useStateValue();
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dipatch({
          type: "SET_USER",
          user: authuser,
        });
      } else {
        dipatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/checkouts" element={<Chekout />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="payment"
            element={
              <Elements stripe={Promise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
