import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Advices from "./pages/Advices";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import More from "./pages/More";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/advices" element={<Advices />} />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/more" element={<More />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;