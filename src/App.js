import "./App.css";
import Navbar from "./components/Navbar";
import AddQuestion1 from "./components/AddQuestion1";
import Footer from "./components/Footer";
import DisplayQuetions from "./components/DisplayQuetionsStruct";
import DisplayQuestion2 from "./components/DisplayQuestion2"
import Try from "./components/Try";
import { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataListExample from "./components/DataList";

function App() {
  

 
  return (
    <BrowserRouter className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={ <DisplayQuestion2  />}
        />
        <Route path="/addquestion1" element={<AddQuestion1 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
