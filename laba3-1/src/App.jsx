import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router";
import MainPage from './pages/main/index.jsx';
import ProductPage from './pages/product/index.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
