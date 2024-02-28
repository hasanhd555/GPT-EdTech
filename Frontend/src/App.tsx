import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Counter from "./test_comp/counter";
import Unpersisted_Counter from "./test_comp/unpersisted_ctr";

function App() {
  return (
    <Routes>
      <Route path="/ctr_test" element={<Counter />} />
      <Route path="/unpersisted_ctr_test" element={<Unpersisted_Counter />} />
      <Route path="/signup" element={<SignUpPage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
    </Routes>
  );
}

export default App;
