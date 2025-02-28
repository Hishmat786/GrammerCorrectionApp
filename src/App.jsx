import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import './App.css'
import Home from './Components/Home';
import GrammerChecker from './Components/GrammerChecker';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grammar-checker" element={<GrammerChecker/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
