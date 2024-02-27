import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import Counter from "./test_comp/counter";
import Unpersisted_Counter from "./test_comp/unpersisted_ctr";
import Navbar from "./components/Navbar and Footer/Navbar";
import Footer from "./components/Navbar and Footer/Footer";

function App() {
  return (
    <Routes>
      <Route path="/ctr_test" element={<Counter />} />
      <Route path="/unpersisted_ctr_test" element={<Unpersisted_Counter />} />
      <Route path="/nav" element={<Footer />} />
    </Routes>
  );
}

export default App;
