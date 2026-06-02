import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiShield,
  FiMoreHorizontal,
  FiBell
} from "react-icons/fi";

function Home() {
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");

  const cityTranslations = {
  Tbilisi: "თბილისი",
  Batumi: "ბათუმი",
  Kutaisi: "ქუთაისი",
  Akhaltsikhe: "ახალციხე",
  Telavi: "თელავი",
  Rustavi: "რუსთავი",
  Gori: "გორი",
  Zugdidi: "ზუგდიდი",
  Poti: "ფოთი",
  Senaki: "სენაკი",
};

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  axios
    .get("http://127.0.0.1:8000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUserName(response.data.first_name);
      setCity(response.data.city);
      setRegion(response.data.region);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

  const hasDanger = true;
  const disasterType = "წყალდიდობა";

  const nearbyHasDanger = false;

  return (
    <div className="homePage">
      <div className="homePhone">
        <div className="topBar">
          <div className="logoRow">
            <div className="logoDot"></div>
            <h2>GeoAlert</h2>
          </div>

          <Link to="/notifications" className="bellButton">
  <FiBell />
</Link>
        </div>

        <h1 className="homeGreeting">გამარჯობა, {userName}</h1>

        <p className="locationText">
          თქვენი მდებარეობა: {cityTranslations[city] || city}
        </p>

        <div className={hasDanger ? "alertCard danger" : "alertCard safe"}>
        <div className="alertIcon">!</div>


          <h2>
            {hasDanger
                ? `მოსალოდნელია ${disasterType}`
                : "მოსალოდნელი საფრთხე არ არის"}
          </h2>

          <p className="alertDescription">
            {hasDanger
                ? "დეტალური რეკომენდაციების სანახავად გადადით რჩევების გვერდზე."
                : "ამ დროისთვის თქვენს ქალაქში საფრთხე არ ფიქსირდება."}
          </p>

          <Link to="/advices" className="recommendButton">
            რეკომენდაციების ნახვა
          </Link>
        </div>

        <p className="sectionTitle">ამჟამინდელი ლოკაცია:</p>

        <div className="mapCard">

        </div>

        <p className="sectionTitle english">ახლომდებარე ქალაქი:</p>

        <div className={nearbyHasDanger ? "nearbyCard danger" : "nearbyCard safe"}>
          <div className="nearbyIcon"></div>
          <div>
            <p className="nearbySmall">ბორჯომი</p>
            <h3>
              {nearbyHasDanger
                  ? "მეზობელ ქალაქში ფიქსირდება საფრთხე"
                  : "მოსალოდნელი საფრთხე არ არის"}
            </h3>
          </div>
        </div>

        <div className="bottomNav">

          <Link to="/home" className="navItem active">
            <FiHome/>
            <p>მთავარი</p>
          </Link>

          <Link to="/profile" className="navItem">
            <FiUser/>
            <p>პროფილი</p>
          </Link>

          <Link to="/advices" className="navItem">
            <FiShield/>
            <p>რჩევები</p>
          </Link>

          <Link to="/more" className="navItem">
            <FiMoreHorizontal/>
            <p>მეტი</p>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Home;