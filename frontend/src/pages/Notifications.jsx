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

function Notifications() {
  const [alerts, setAlerts] = useState([]);
  const [city, setCity] = useState("");

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

  const getDisasterConfig = (type) => {
    if (type === "Flood" || type === "წყალდიდობა") {
      return {
        title: "წყალდიდობა",
        icon: <FiDroplet />,
        circleClass: "blueBg",
      };
    }

    if (type === "Heavy Rain" || type === "ძლიერი ნალექი") {
      return {
        title: "ძლიერი ნალექი",
        icon: <FiCloudRain />,
        circleClass: "orangeBg",
      };
    }

    if (type === "Strong Wind" || type === "ძლიერი ქარი") {
      return {
        title: "ძლიერი ქარი",
        icon: <FiWind />,
        circleClass: "darkBlueBg",
      };
    }

    if (type === "Heat" || type === "მაღალი ტემპერატურა") {
      return {
        title: "მაღალი ტემპერატურა",
        icon: <FiSun />,
        circleClass: "heatBg",
      };
    }

    return {
      title: "საფრთხე არ არის",
      icon: <FiShield />,
      circleClass: "safeBg",
    };
  };

  const getRiskText = (risk) => {
    if (risk === "High") return "მაღალი საფრთხე";
    if (risk === "Medium") return "საშუალო საფრთხე";
    if (risk === "Low") return "დაბალი საფრთხე";
    return "საფრთხე არ არის";
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
        setCity(userCity);

        return axios.get(`http://127.0.0.1:8000/alerts/${userCity}`);
      })
      .then((response) => {
        setAlerts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="notificationsPage">
      <div className="notificationsPhone">
        <div className="notificationsHeader">
          <Link to="/home" className="backButton">
            <FiArrowLeft />
          </Link>

          <h1>შეტყობინებები</h1>
        </div>

        <p className="cityText">
          ქალაქი: <span>{cityTranslations[city] || city}</span>
        </p>

        {alerts.length === 0 ? (
          <div className="emptyCard">
            <div className="emptyIcon">
              <FiBell />
            </div>

            <h2>შეტყობინებები არ მოიძებნა</h2>

            <p>
              ამ ქალაქისთვის ამ ეტაპზე საფრთხე არ ფიქსირდება
            </p>
          </div>
        ) : (
          <div className="notificationsList">
            {alerts.map((alert) => {
              const config = getDisasterConfig(alert.disaster_type);

              return (
                <div className="notificationCard" key={alert.id}>
                  <div className={`notificationIcon ${config.circleClass}`}>
                    {config.icon}
                  </div>

                  <div className="notificationContent">
                    <div className="notificationTop">
                      <h3>{config.title}</h3>

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

                    <p className="recommendationText">
                      {alert.recommendation}
                    </p>

                    <p className="notificationDate">
                      {new Date(alert.created_at).toLocaleString("ka-GE")}
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