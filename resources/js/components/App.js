import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";

const App = () =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}