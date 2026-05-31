import "./Welcome.css";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="page">
      <div className="phone">

        <div className="logoCircle">
          <div className="shield"></div>
        </div>

        <h1>GeoAlert</h1>

        <div className="line"></div>

        <p className="description">
          კეთილი იყოს თქვენი მობრძანება
          <br />
          GeoAlert-ში.
          <br />
          მიიღეთ დროული გაფრთხილებები
          <br />
          და უსაფრთხოების რეკომენდაციები.
        </p>

        <div className="buttons">

          <Link to="/register">
            <button className="registerBtn">
              რეგისტრაცია
            </button>
          </Link>

          <Link to="/login">
            <button className="loginBtn">
              შესვლა
            </button>
          </Link>

        </div>

        <p className="bottomText">
          YOUR SAFETY, OUR PRIORITY
        </p>

      </div>
    </div>
  );
}

export default Welcome;