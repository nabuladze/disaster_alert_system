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
  FiMapPin,
} from "react-icons/fi";

// მთავარი გვერდის კომპონენტი
function Home() {
  // მომხმარებლის და ამინდის მონაცემების state-ები
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [nearbyCity, setNearbyCity] = useState("");
  const [nearbyWeather, setNearbyWeather] = useState(null);

  // ქალაქების ინგლისურიდან ქართულად თარგმნა UI-ში გამოსაჩენად
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
    Tsageri: "ცაგერი",
    Ambrolauri: "ამბროლაური",
    Mtskheta: "მცხეთა",
    Gurjaani: "გურჯაანი",
    Sighnaghi: "სიღნაღი",
    Qvareli: "ყვარელი",
    Lagodekhi: "ლაგოდეხი",
    Zestaponi: "ზესტაფონი",
    Samtredia: "სამტრედია",
    Chiatura: "ჭიათურა",
    Kobuleti: "ქობულეთი",
    Ozurgeti: "ოზურგეთი",
    Lanchkhuti: "ლანჩხუთი",
    Chokhatauri: "ჩოხატაური",
    Sukhumi: "სოხუმი",
    Gagra: "გაგრა",
    Oni: "ონი",
    Marneuli: "მარნეული",
    Bolnisi: "ბოლნისი",
    Khashuri: "ხაშური",
    Kareli: "ქარელი",
    Dusheti: "დუშეთი",
    Kazbegi: "ყაზბეგი",
    Mestia: "მესტია",
  };

  // თითოეული ქალაქისთვის ერთი ახლომდებარე ქალაქის განსაზღვრა
  const nearbyCities = {
    Tbilisi: "Rustavi",
    Telavi: "Gurjaani",
    Gurjaani: "Telavi",
    Sighnaghi: "Qvareli",
    Qvareli: "Sighnaghi",
    Lagodekhi: "Telavi",
    Kutaisi: "Samtredia",
    Samtredia: "Kutaisi",
    Zestaponi: "Chiatura",
    Chiatura: "Zestaponi",
    Batumi: "Kobuleti",
    Kobuleti: "Batumi",
    Ozurgeti: "Lanchkhuti",
    Lanchkhuti: "Ozurgeti",
    Chokhatauri: "Ozurgeti",
    Zugdidi: "Senaki",
    Senaki: "Zugdidi",
    Poti: "Senaki",
    Akhaltsikhe: "Borjomi",
    Borjomi: "Akhaltsikhe",
    Akhalkalaki: "Akhaltsikhe",
    Mestia: "Zugdidi",
    Tsageri: "Ambrolauri",
    Sukhumi: "Gagra",
    Gagra: "Sukhumi",
    Ambrolauri: "Oni",
    Oni: "Ambrolauri",
    Rustavi: "Tbilisi",
    Marneuli: "Bolnisi",
    Bolnisi: "Marneuli",
    Gori: "Khashuri",
    Khashuri: "Gori",
    Kareli: "Gori",
    Mtskheta: "Tbilisi",
    Dusheti: "Mtskheta",
    Kazbegi: "Dusheti",
  };

  // OpenWeather API-დან მიღებული ამინდის აღწერების თარგმნა ქართულად
  const weatherTranslations = {
    "clear sky": "მოწმენდილი ცა",
    "few clouds": "ნაწილობრივ ღრუბლიანი",
    "scattered clouds": "ღრუბლიანი",
    "broken clouds": "მეტწილად ღრუბლიანი",
    "overcast clouds": "მოღრუბლული",
    "light rain": "მსუბუქი წვიმა",
    "moderate rain": "ზომიერი წვიმა",
    "heavy rain": "ძლიერი წვიმა",
    "heavy intensity rain": "ძალიან ძლიერი წვიმა",
    "very heavy rain": "ძალიან ძლიერი წვიმა",
    thunderstorm: "ქუხილი",
    mist: "ნისლი",
    fog: "ნისლი",
    snow: "თოვლი",
  };

  // საფრთხის დონის თარგმნა
  const riskTranslations = {
    Low: "დაბალი",
    Medium: "საშუალო",
    High: "მაღალი",
  };

  // კატასტროფის ტიპების თარგმნა
  const disasterTypeTranslations = {
    Flood: "წყალდიდობა",
    "Heavy Rain": "ძლიერი ნალექი",
    Storm: "ძლიერი ქარი",
    "Extreme Heat": "მაღალი ტემპერატურა",
    "No danger": "საფრთხე არ არის",
  };

  // გვერდის ჩატვირთვისას მომხმარებლის, ამინდის და ახლომდებარე ქალაქის მონაცემების მიღება
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    let userCity = "";

    // ავტორიზებული მომხმარებლის ინფორმაციის მიღება
    axios
      .get("http://127.0.0.1:8000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        userCity = response.data.city;
        const nearCity = nearbyCities[userCity] || "Tbilisi";

        setUserName(response.data.first_name);
        setCity(userCity);
        setNearbyCity(nearCity);

        // ერთდროულად იღებს მომხმარებლის ქალაქის და ახლომდებარე ქალაქის ამინდს
        return Promise.all([
          axios.get(`http://127.0.0.1:8000/weather/${userCity}`),
          axios.get(`http://127.0.0.1:8000/weather/${nearCity}`),
        ]);
      })
      .then(([weatherResponse, nearbyResponse]) => {
        const weather = weatherResponse.data;

        setWeatherData(weather);
        setNearbyWeather(nearbyResponse.data);

        // თუ მომხმარებლის ქალაქში საფრთხეა, alert ინახება backend-ში
        if (weather.disaster_type && weather.disaster_type !== "No danger") {
        const savedAlertKey = `alert_saved_${userCity}_${weather.disaster_type}`;

        // sessionStorage იცავს სისტემას ერთი და იგივე alert-ის მრავალჯერ შენახვისგან
        if (!sessionStorage.getItem(savedAlertKey)) {
        axios
          .post(
            `http://127.0.0.1:8000/generate-alert-for-city/${userCity}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        .then(() => {
            sessionStorage.setItem(savedAlertKey, "true");
        })
        .catch((error) => {
            console.log("Could not save alert:", error);
        });
    }
}
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ამოწმებს არის თუ არა საფრთხე მომხმარებლის ქალაქში
  const hasDanger = weatherData && weatherData.disaster_type !== "No danger";
  // ამოწმებს არის თუ არა საფრთხე ახლომდებარე ქალაქში
  const nearbyHasDanger =
    nearbyWeather && nearbyWeather.disaster_type !== "No danger";

  // მიმდინარე კატასტროფის სახელი ქართულად
  const currentDisaster = weatherData
    ? disasterTypeTranslations[weatherData.disaster_type] ||
      weatherData.disaster_type
    : "";

  return (
    <div className="homePage">
      <div className="homePhone">
        <div className="topBar">  {/* ზედა ბარი ლოგოთი და შეტყობინებების ღილაკით */}
          <div className="logoRow">
            <Logo size="small" />
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

        {/* მთავარი საფრთხის სტატუსის ბარათი */}
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
              <h2>
                {weatherData ? Math.round(weatherData.temperature) : "--"}°C
              </h2>
              <p>
                {weatherData
                  ? weatherTranslations[weatherData.weather] ||
                    weatherData.weather
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
              ტემპერატურა:{" "}
              {weatherData ? Math.round(weatherData.temperature) : "--"}°C
            </p>

            <p>
              <FiAlertCircle />
              რისკი:{" "}
              {weatherData
                ? riskTranslations[weatherData.risk_level] ||
                  weatherData.risk_level
                : "--"}
            </p>
          </div>
        </div>

        <p className="sectionTitle">ახლომდებარე ქალაქი</p>
        {/* ახლომდებარე ქალაქის რისკის ბარათი */}
        <div
          className={nearbyHasDanger ? "nearbyCard danger" : "nearbyCard safe"}
        >
          <div className="nearbyIcon">
            <FiMapPin />
          </div>

          <div>
            <p className="nearbySmall">
              {nearbyCity
                ? cityTranslations[nearbyCity] || nearbyCity
                : "ახლომდებარე ქალაქი"}
            </p>

            <h3>
              {nearbyWeather
                ? nearbyHasDanger
                  ? `ფიქსირდება ${
                      disasterTypeTranslations[nearbyWeather.disaster_type] ||
                      nearbyWeather.disaster_type
                    }`
                  : "მოსალოდნელი საფრთხე არ არის"
                : "მონაცემები იტვირთება..."}
            </h3>
          </div>
        </div>
        {/* ქვედა ნავიგაცია */}
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