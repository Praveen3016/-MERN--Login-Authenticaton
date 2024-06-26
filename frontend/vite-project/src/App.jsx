import { useState } from "react";
import SignUp from "./Component/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import { AuthContextProvider } from "./context/authContext";
import "./App.css";
import Login from "./Component/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <BrowserRouter>
        <AuthContextProvider>

          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          </AuthContextProvider>

        </BrowserRouter>
    </>
  );
}

export default App;
