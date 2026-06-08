import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiShield,
  FiMoreHorizontal,
} from "react-icons/fi";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [message, setMessage] = useState("");

  const citiesByRegion = {
    თბილისი: [{ label: "თბილისი", value: "Tbilisi" }],
    კახეთი: [
      { label: "თელავი", value: "Telavi" },
      { label: "გურჯაანი", value: "Gurjaani" },
      { label: "სიღნაღი", value: "Sighnaghi" },
      { label: "ყვარელი", value: "Qvareli" },
      { label: "ლაგოდეხი", value: "Lagodekhi" },
    ],
    იმერეთი: [
      { label: "ქუთაისი", value: "Kutaisi" },
      { label: "ზესტაფონი", value: "Zestaponi" },
      { label: "სამტრედია", value: "Samtredia" },
      { label: "ჭიათურა", value: "Chiatura" },
    ],
    აჭარა: [
      { label: "ბათუმი", value: "Batumi" },
      { label: "ქობულეთი", value: "Kobuleti" },
    ],
    გურია: [
      { label: "ოზურგეთი", value: "Ozurgeti" },
      { label: "ლანჩხუთი", value: "Lanchkhuti" },
      { label: "ჩოხატაური", value: "Chokhatauri" },
    ],
    სამეგრელო: [
      { label: "ზუგდიდი", value: "Zugdidi" },
      { label: "ფოთი", value: "Poti" },
      { label: "სენაკი", value: "Senaki" },
    ],
    "სამცხე-ჯავახეთი": [
      { label: "ახალციხე", value: "Akhaltsikhe" },
      { label: "ბორჯომი", value: "Borjomi" },
      { label: "ახალქალაქი", value: "Akhalkalaki" },
    ],
    სვანეთი: [{ label: "მესტია", value: "Mestia" }],
    ლეჩხუმი: [{ label: "ცაგერი", value: "Tsageri" }],
    აფხაზეთი: [
      { label: "სოხუმი", value: "Sukhumi" },
      { label: "გაგრა", value: "Gagra" },
    ],
    რაჭა: [
      { label: "ამბროლაური", value: "Ambrolauri" },
      { label: "ონი", value: "Oni" },
    ],
    "ქვემო ქართლი": [
      { label: "რუსთავი", value: "Rustavi" },
      { label: "მარნეული", value: "Marneuli" },
      { label: "ბოლნისი", value: "Bolnisi" },
    ],
    "შიდა ქართლი": [
      { label: "გორი", value: "Gori" },
      { label: "ხაშური", value: "Khashuri" },
      { label: "ქარელი", value: "Kareli" },
    ],
    "მცხეთა-მთიანეთი": [
      { label: "მცხეთა", value: "Mtskheta" },
      { label: "დუშეთი", value: "Dusheti" },
      { label: "ყაზბეგი", value: "Kazbegi" },
    ],
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
        setUser(response.data);
        setSelectedRegion(response.data.region || "");
        setSelectedCity(response.data.city || "");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        "http://127.0.0.1:8000/me/location",
        {
          region: selectedRegion,
          city: selectedCity,
          latitude: null,
          longitude: null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("პროფილი წარმატებით განახლდა");
    } catch (error) {
      console.log(error);
      setMessage("პროფილის განახლება ვერ მოხერხდა");
    }
  };

  if (!user) {
    return <p>იტვირთება...</p>;
  }

  return (
    <div className="profilePage">
      <div className="profilePhone">
        <div className="profileHeader">
          <Logo size="small" />
          <h1>GeoAlert</h1>
        </div>

        <div className="profileForm">
          <label>სახელი</label>
          <input value={user.first_name || ""} readOnly />

          <label>გვარი</label>
          <input value={user.last_name || ""} readOnly />

          <label>ტელეფონი</label>
          <input value={user.phone || ""} readOnly />

          <label>დაბადების თარიღი</label>
          <input value={user.date_of_birth || ""} readOnly />

          <label>რეგიონი</label>
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedCity("");
            }}
          >
            <option value="">აირჩიეთ რეგიონი</option>

            {Object.keys(citiesByRegion).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <label>ქალაქი / მუნიციპალიტეტი</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedRegion}
          >
            <option value="">აირჩიეთ ქალაქი / მუნიციპალიტეტი</option>

            {selectedRegion &&
              citiesByRegion[selectedRegion] &&
              citiesByRegion[selectedRegion].map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
          </select>

          {message && <p className="profileMessage">{message}</p>}

          <button className="saveProfileBtn" onClick={handleSave}>
            პროფილის შენახვა
          </button>
        </div>

        <div className="bottomNav">
          <Link to="/home" className="navItem">
            <FiHome />
            <p>მთავარი</p>
          </Link>

          <Link to="/profile" className="navItem active">
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

export default Profile;