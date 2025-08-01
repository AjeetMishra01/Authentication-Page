import { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Register/Dashboard";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
