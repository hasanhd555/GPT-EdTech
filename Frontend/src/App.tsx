import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Counter from './test_comp/counter';

 

function App() {
  return (
    <Routes>
      <Route path="/redux_test" element={<Counter/>}/>
    </Routes>
  );
}

export default App;
