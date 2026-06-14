// React Router-ის კომპონენტები გვერდებს შორის გადასასვლელად
import { BrowserRouter, Routes, Route } from "react-router-dom";
// აპლიკაციის ყველა გვერდის იმპორტი
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Advices from "./pages/Advices";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import More from "./pages/More";

// მთავარი კომპონენტი, რომელიც მართავს აპლიკაციის ნავიგაციას
function App() {
  return (
    // BrowserRouter უზრუნველყოფს URL-ების მართვას
    <BrowserRouter>
      {/* Routes ინახავს ყველა შესაძლო მარშრუტს */}
      <Routes>

        {/* საწყისი გვერდი */}
        <Route path="/" element={<Welcome />} />

        {/* რეგისტრაციის გვერდი */}
        <Route path="/register" element={<Register />} />

        {/* ავტორიზაციის (ლოგინის) გვერდი */}
        <Route path="/login" element={<Login />} />

        {/* მთავარი გვერდი, სადაც ნაჩვენებია ამინდი და რისკები */}
        <Route path="/home" element={<Home />} />

        {/* უსაფრთხოების რეკომენდაციების გვერდი */}
        <Route path="/advices" element={<Advices />} />

        {/* შეტყობინებების ისტორიის გვერდი */}
        <Route path="/notifications" element={<Notifications />} />

        {/* მომხმარებლის პროფილის გვერდი */}
        <Route path="/profile" element={<Profile />} />

        {/* დამატებითი ინფორმაციისა და პარამეტრების გვერდი */}
        <Route path="/more" element={<More />} />

      </Routes>

    </BrowserRouter>
  );
}
// კომპონენტის ექსპორტი სხვა ფაილებში გამოსაყენებლად
export default App;