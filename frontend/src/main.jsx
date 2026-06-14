// React-ის StrictMode გამოიყენება განვითარების რეჟიმში
// შესაძლო პრობლემებისა და გაფრთხილებების გამოსავლენად
import { StrictMode } from "react";
// React DOM-ის ფუნქცია, რომელიც აპლიკაციას HTML გვერდზე აჩვენებს
import { createRoot } from "react-dom/client";
// გლობალური CSS სტილების იმპორტი
import "./index.css";
// მთავარი App კომპონენტის იმპორტი
import App from "./App.jsx";

// HTML ფაილში არსებული root ელემენტის მოძებნა
// და React აპლიკაციის ჩატვირთვა მასში
createRoot(document.getElementById("root")).render(
  // StrictMode ამოწმებს კომპონენტებს შესაძლო შეცდომებზე
  <StrictMode>
    {/* მთავარი აპლიკაციის კომპონენტი */}
    <App />
  </StrictMode>
);
