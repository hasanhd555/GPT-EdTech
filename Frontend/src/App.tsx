import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUpPage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
