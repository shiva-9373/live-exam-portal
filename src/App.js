import "./App.css";
import Navbar from "./components/Navbar";
import AddQuetion from "./components/AddQuetion";
import Footer from "./components/Footer";
import DisplayQuetions from "./components/DisplayQuetionsStruct";
import DisplayQuestion2 from "./components/DisplayQuestion2"
import Try from "./components/Try";
import { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataListExample from "./components/DataList";

function App() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRlNTgyY2U2ZDdkNzdjOGU0ZmEzMWEiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQyMzEzOTA2LCJleHAiOjE2NDIzNTcxMDZ9.LeSUkdTyLOVxe-h9eM6rC5E5tlOyC-gCDdoKHwYBSsI";

  const [question, setQuetion] = useState();

  function getQuetion() {
    Axios.get(
      "https://admin.liveexamcenter.in/api/questions?page=1&limit=20&term=&topic=",
      {
        headers: { Authorization: `${token}` },
      }
    ).then((res) => {
      console.log(res.data);
      setQuetion(res.data);
    });
  }

  useEffect(() => {
    getQuetion();
  }, []);

  console.log(question);
  return (
    <BrowserRouter className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={question && <DisplayQuestion2 data={question} />}
        />
        <Route path="/addquestion" element={<AddQuetion />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
