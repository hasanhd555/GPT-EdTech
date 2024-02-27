import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Counter from './test_comp/counter';
import Unpersisted_Counter from './test_comp/unpersisted_ctr';

 

function App() {
  return (
    <Routes>
      <Route path="/ctr_test" element={<Counter/>}/>
      <Route path ="/unpersisted_ctr_test" element={<Unpersisted_Counter/>}/>
    </Routes>
  );
}

export default App;
