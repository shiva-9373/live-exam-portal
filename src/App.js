import "./App.css";
import Navbar from "./components/Navbar";
import AddQuestion from "./components/AddQuestion";
import EditQuestion from "./components/EditQuestion";

import Footer from "./components/Footer";
import DisplayQuestion from "./components/DisplayQuestion"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

 
  return (
    <BrowserRouter className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={ <DisplayQuestion />}
        />
        <Route path="/addquestion" element={<AddQuestion />} />
        <Route path="/editquestion/:id" element={<EditQuestion />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
