//აპლიკაციის ლოგოს კომპონენტი
import { IoShieldSharp } from "react-icons/io5";
import "./Logo.css";

function Logo({ size = "large" }) {
  return (
    // size prop-ის მიხედვით იცვლება ლოგოს ზომა
    <div className={`logoWrapper ${size}`}>
      <div className="logoCircle">
        <IoShieldSharp className="logoShieldIcon" />
      </div>
    </div>
  );
}

export default Logo;