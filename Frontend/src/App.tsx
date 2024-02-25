import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUpPage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
