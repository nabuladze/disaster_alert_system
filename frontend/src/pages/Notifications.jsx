import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiBell,
  FiDroplet,
  FiCloudRain,
  FiWind,
  FiSun,
  FiShield,
} from "react-icons/fi";
import "./Notifications.css";

// მომხმარებლის შეტყობინებების ისტორიის გვერდი
function Notifications() {
  // შეტყობინებების და მომხმარებლის ქალაქის state-ები
  const [alerts, setAlerts] = useState([]);
  const [city, setCity] = useState("");

  // ქალაქების ქართული თარგმანები
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

  // კატასტროფის ტიპის მიხედვით აბრუნებს
  // სათაურს, აიქონს და ფერს
  const getDisasterConfig = (type) => {
    switch (type) {
      case "Flood":
      case "წყალდიდობა":
        return {
          title: "წყალდიდობა",
          icon: <FiDroplet />,
          circleClass: "blueBg",
        };

      case "Heavy Rain":
      case "ძლიერი ნალექი":
        return {
          title: "ძლიერი ნალექი",
          icon: <FiCloudRain />,
          circleClass: "orangeBg",
        };

      case "Storm":
      case "Strong Wind":
      case "ძლიერი ქარი":
        return {
          title: "ძლიერი ქარი",
          icon: <FiWind />,
          circleClass: "darkBlueBg",
        };

      case "Extreme Heat":
      case "Heat":
      case "მაღალი ტემპერატურა":
        return {
          title: "მაღალი ტემპერატურა",
          icon: <FiSun />,
          circleClass: "heatBg",
        };

      default:
        return {
          title: "საფრთხე არ არის",
          icon: <FiShield />,
          circleClass: "safeBg",
        };
    }
  };

  // რისკის დონის ტექსტური წარმოდგენა
  const getRiskText = (risk) => {
    if (risk === "High") return "მაღალი საფრთხე";
    if (risk === "Medium") return "საშუალო საფრთხე";
    if (risk === "Low") return "დაბალი საფრთხე";
    return "საფრთხე არ არის";
  };

  // გვერდის ჩატვირთვისას იტვირთება
  // მომხმარებლის ინფორმაცია და მისი შეტყობინებები
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    axios
      // მომხმარებლის მონაცემების მიღება
      .get("http://127.0.0.1:8000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userCity = response.data.city;
        setCity(userCity);

        // კონკრეტული მომხმარებლის alert-ების მიღება
        return axios.get("http://127.0.0.1:8000/my-alerts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      })
      .then((response) => {
        // მიღებული შეტყობინებების შენახვა state-ში
        setAlerts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="notificationsPage">
      <div className="notificationsPhone">
        {/* გვერდის ზედა ნაწილი */}
        <div className="notificationsHeader">
          <Link to="/home" className="backButton">
            <FiArrowLeft />
          </Link>

          <h1>შეტყობინებები</h1>
        </div>

        {/* მომხმარებლის მიმდინარე ქალაქი */}
        <p className="cityText">
          ქალაქი: <span>{cityTranslations[city] || city}</span>
        </p>

        {/* თუ შეტყობინებები არ არსებობს */}
        {alerts.length === 0 ? (
          <div className="emptyCard">
            <div className="emptyIcon">
              <FiBell />
            </div>

            <h2>შეტყობინებები არ არის</h2>

            <p>
              ამ დროისთვის თქვენს ქალაქში
              <br />
              აქტიური გაფრთხილებები არ ფიქსირდება.
            </p>
          </div>
        ) : (
          // შეტყობინებების სია
          <div className="notificationsList">
            {alerts.map((alert) => {
              // თითოეული alert-ის ვიზუალური კონფიგურაცია
              const config = getDisasterConfig(alert.disaster_type);

              return (
                <div className="notificationCard" key={alert.id}>
                  {/* კატასტროფის აიქონი */}
                  <div className={`notificationIcon ${config.circleClass}`}>
                    {config.icon}
                  </div>

                  <div className="notificationContent">
                    <div className="notificationTop">
                      {/* კატასტროფის დასახელება */}
                      <h3>{config.title}</h3>

                      {/* რისკის დონის მაჩვენებელი */}
                      <span
                        className={
                          alert.risk_level === "High"
                            ? "riskBadge high"
                            : alert.risk_level === "Medium"
                            ? "riskBadge medium"
                            : "riskBadge low"
                        }
                      >
                        {getRiskText(alert.risk_level)}
                      </span>
                    </div>

                    {/* რეკომენდაცია მომხმარებლისთვის */}
                    <p className="recommendationText">
                      {alert.recommendation}
                    </p>

                    {/* შეტყობინების თარიღი, დრო და ქალაქი */}
                    <p className="notificationDate">
                      {new Date(alert.created_at).toLocaleString("ka-GE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      {cityTranslations[alert.city] || alert.city}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;