import React from "react";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import "./App.css";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Counter from "./test_comp/counter";
import Unpersisted_Counter from "./test_comp/unpersisted_ctr";

import NavbarComp from "../src/components/Navbar and Footer/Navbar";
import Footer from "./components/Navbar and Footer/Footer";

function App() {
  return (

    <>
    <NavbarComp></NavbarComp>
      <Routes>
        <Route path="/ctr_test" element={<Counter />} />
        <Route path="/unpersisted_ctr_test" element={<Unpersisted_Counter />} />
        <Route path="/signup" element={<SignUpPage/>}></Route>
       <Route path="/login" element={<LoginPage/>}></Route>
        <Route
          path="/dash"
          element={<UserDashboard studentId={"65da8d92d14e603d876cb448"} />}
        />
      </Routes>
      <Footer />
    </>

  );
}

export default App;
