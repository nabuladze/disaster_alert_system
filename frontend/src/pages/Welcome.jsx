import "./Welcome.css";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

// აპლიკაციის საწყისი (Welcome) გვერდი
function Welcome() {
  return (
    <div className="page">
      <div className="phone">

        {/* აპლიკაციის ლოგო და დასახელება */}
        <div className="welcomeLogoSection">
          <Logo size="large"/>
          <h1 className="welcomeTitle">GeoAlert</h1>
        </div>
        {/* დეკორატიული გამყოფი ხაზი */}
        <div className="line"></div>
        {/* აპლიკაციის მოკლე აღწერა */}
        <p className="description">
          კეთილი იყოს თქვენი მობრძანება
          <br />
          GeoAlert-ში.
          <br />
          მიიღეთ დროული გაფრთხილებები
          <br />
          და უსაფრთხოების რეკომენდაციები.
        </p>

        {/* ნავიგაცია რეგისტრაციისა და ავტორიზაციის გვერდებზე */}
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

        {/* აპლიკაციის სლოგანი */}
        <p className="bottomText">
          YOUR SAFETY, OUR PRIORITY
        </p>

      </div>
    </div>
  );
}

export default Welcome;