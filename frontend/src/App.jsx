import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Advices from "./pages/Advices";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/advices" element={<Advices />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;