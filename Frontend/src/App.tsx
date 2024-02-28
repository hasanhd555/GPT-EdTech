import React from 'react';
import UserDashboard from './components/UserDashboard/UserDashboard';
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import Counter from "./test_comp/counter";
import Unpersisted_Counter from "./test_comp/unpersisted_ctr";

function App() {
  return (
    <Routes>
      <Route path="/ctr_test" element={<Counter />} />
      <Route path="/unpersisted_ctr_test" element={<Unpersisted_Counter />} />
      <Route path="/dash" element={<UserDashboard studentId={'65da8d92d14e603d876cb448'}/>} />
    </Routes>
  );
}

export default App;
