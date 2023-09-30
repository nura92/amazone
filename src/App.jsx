import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateValue } from "./components/StateProvider/StateProvider";
import { onAuthStateChanged } from "firebase/auth";

import { firebaseAuth } from "./util/Firebaseconfig";
import SharedLayout from "./pages/SharedLayout";
import Home from "./components/home/Home";
import Login from "./pages/loginpage/Login";
import Chekout from "./pages/chekout/Chekout";
import "./App.css";
function App() {
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
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
