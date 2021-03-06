import "./App.css";
import AddQuestion from "./components/AddQuestion";
import EditQuestion from "./components/EditQuestion";
import QuillEditor from "./components/QuillEditor";
import Footer from "./components/Footer";
import DisplayQuestion from "./components/DisplayQuestion";
import Login from "./components/Login/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function App() {
  return (
    <div>
      <BrowserRouter className="App">
        <Routes>
        <Route path="/displayquestion" element={<DisplayQuestion />} />
        
        {" "}
        <Route path="/" element={  <GoogleReCaptchaProvider
        reCaptchaKey="6Ld3COIZAAAAAC3A_RbO1waRz6QhrhdObYOk7b_5"
        scriptProps={{
          async: false, // optional, default to false,
          defer: false, // optional, default to false
          appendTo: "head", // optional, default to "head", can be "head" or "body",
          nonce: undefined, // optional, default undefined
        }}
      ><Login /></GoogleReCaptchaProvider>} />
          
          <Route path="/addquestion" element={<AddQuestion />} />
          <Route path="/editquestion/:id" element={<EditQuestion />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
