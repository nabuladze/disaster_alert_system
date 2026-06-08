import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiShield,
  FiMoreHorizontal,
  FiBell,
  FiCloudRain,
  FiWind,
  FiThermometer,
  FiAlertCircle,
  FiCheckCircle,
  FiMapPin
} from "react-icons/fi";

function Home() {
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

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
    Borjomi: "ბორჯომი",
    Akhalkalaki: "ახალქალაქი",
  };

  const weatherTranslations = {
  "clear sky": "მოწმენდილი ცა",
  "few clouds": "ნაწილობრივ ღრუბლიანი",
  "scattered clouds": "ღრუბლიანი",
  "broken clouds": "მეტწილად ღრუბლიანი",
  "overcast clouds": "მოღრუბლული",
  "light rain": "მსუბუქი წვიმა",
  "moderate rain": "ზომიერი წვიმა",
  "heavy rain": "ძლიერი წვიმა",
  "very heavy rain": "ძალიან ძლიერი წვიმა",
  "thunderstorm": "ქუხილი",
  "mist": "ნისლი",
  "fog": "ნისლი",
  "snow": "თოვლი"
};

  const riskTranslations = {
  Low: "დაბალი",
  Medium: "საშუალო",
  High: "მაღალი",
};

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userCity = response.data.city;

        setUserName(response.data.first_name);
        setCity(userCity);

        return axios.get(`http://127.0.0.1:8000/weather/${userCity}`);
      })
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const hasDanger = weatherData && weatherData.disaster_type !== "No danger";

  const disasterTypeTranslations = {
    Flood: "წყალდიდობა",
    "Heavy Rain": "ძლიერი ნალექი",
    Storm: "ძლიერი ქარი",
    "Extreme Heat": "მაღალი ტემპერატურა",
    "No danger": "საფრთხე არ არის",
  };

  const currentDisaster = weatherData
    ? disasterTypeTranslations[weatherData.disaster_type] || weatherData.disaster_type
    : "";

  const nearbyHasDanger = false;

  return (
    <div className="homePage">
      <div className="homePhone">
        <div className="topBar">
          <div className="logoRow">
            <Logo size="small"/>
            <h2>GeoAlert</h2>
          </div>

          <Link to="/notifications" className="bellButton">
            <FiBell/>
          </Link>
        </div>

        <h1 className="homeGreeting">გამარჯობა, {userName}</h1>

        <p className="locationText">
          თქვენი მდებარეობა: {cityTranslations[city] || city}
        </p>

        <div className={hasDanger ? "statusCard danger" : "statusCard safe"}>
          <div className="statusIcon">
            {hasDanger ? <FiAlertCircle /> : <FiCheckCircle />}
          </div>

          <div>
            <h2>
              {weatherData
                ? hasDanger
                  ? `მოსალოდნელია ${currentDisaster}`
                  : "ამჟამად საფრთხე არ ფიქსირდება"
                : "მონაცემები იტვირთება..."}
            </h2>

            <p>
              {weatherData
                ? hasDanger
                  ? weatherData.recommendation
                  : "ამ დროისთვის თქვენს ქალაქში ამინდის მხრივ საფრთხე არ ფიქსირდება."
                : "გთხოვთ დაელოდოთ..."}
            </p>

            {hasDanger && (
              <Link to="/advices" className="recommendButton">
                რეკომენდაციების ნახვა
              </Link>
            )}
          </div>
        </div>

        <p className="sectionTitle">ამინდი თქვენს ქალაქში</p>

        <div className="weatherCard">
          <div className="weatherTop">
            <div className="weatherIconBox">
              <FiCloudRain />
            </div>

            <div>
              <h2>{weatherData ? Math.round(weatherData.temperature) : "--"}°C</h2>
              <p>
                {weatherData
                    ? weatherTranslations[weatherData.weather] || weatherData.weather
                    : "იტვირთება..."}
              </p>
            </div>
          </div>

          <div className="weatherDetails">
            <p>
              <FiWind />
              ქარი: {weatherData ? weatherData.wind_speed : "--"} მ/წმ
            </p>

            <p>
              <FiThermometer />
              ტემპერატურა: {weatherData ? Math.round(weatherData.temperature) : "--"}°C
            </p>

            <p>
              <FiAlertCircle />
              რისკი: {weatherData
                ? riskTranslations[weatherData.risk_level] || weatherData.risk_level
                : "--"}
            </p>
          </div>
        </div>

        <p className="sectionTitle">ახლომდებარე ქალაქი</p>

        <div className={nearbyHasDanger ? "nearbyCard danger" : "nearbyCard safe"}>
          <div className="nearbyIcon">
            <FiMapPin />
          </div>

          <div>
            <p className="nearbySmall">ბორჯომი</p>
            <h3>
              {nearbyHasDanger
                ? "ახლომდებარე ქალაქში ფიქსირდება საფრთხე"
                : "მოსალოდნელი საფრთხე არ არის"}
            </h3>
          </div>
        </div>

        <div className="bottomNav">
          <Link to="/home" className="navItem active">
            <FiHome />
            <p>მთავარი</p>
          </Link>

          <Link to="/profile" className="navItem">
            <FiUser />
            <p>პროფილი</p>
          </Link>

          <Link to="/advices" className="navItem">
            <FiShield />
            <p>რჩევები</p>
          </Link>

          <Link to="/more" className="navItem">
            <FiMoreHorizontal />
            <p>მეტი</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;