import { IoShieldSharp } from "react-icons/io5";
import "./Logo.css";

function Logo({ size = "large" }) {
  return (
    <div className={`logoWrapper ${size}`}>
      <div className="logoCircle">
        <IoShieldSharp className="logoShieldIcon" />
      </div>
    </div>
  );
}

export default Logo;