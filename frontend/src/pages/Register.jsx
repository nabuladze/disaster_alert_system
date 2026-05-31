import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";

function Register() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  first_name: "",
  last_name: "",
  phone: "",
  date_of_birth: "",
  password: "",
  accepted_terms: false,
});

  const citiesByRegion = {
    თბილისი: [{ label: "თბილისი", value: "Tbilisi" }],

    კახეთი: [
      { label: "თელავი", value: "Telavi" },
      { label: "გურჯაანი", value: "Gurjaani" },
      { label: "სიღნაღი", value: "Sighnaghi" },
      { label: "ყვარელი", value: "Qvareli" },
      { label: "ლაგოდეხი", value: "Lagodekhi" }
    ],

    იმერეთი: [
      { label: "ქუთაისი", value: "Kutaisi" },
      { label: "ზესტაფონი", value: "Zestaponi" },
      { label: "სამტრედია", value: "Samtredia" },
      { label: "ჭიათურა", value: "Chiatura" }
    ],

    აჭარა: [
      { label: "ბათუმი", value: "Batumi" },
      { label: "ქობულეთი", value: "Kobuleti" }
    ],

    გურია: [
      { label: "ოზურგეთი", value: "Ozurgeti" },
      { label: "ლანჩხუთი", value: "Lanchkhuti" },
      { label: "ჩოხატაური", value: "Chokhatauri" }
    ],

    სამეგრელო: [
      { label: "ზუგდიდი", value: "Zugdidi" },
      { label: "ფოთი", value: "Poti" },
      { label: "სენაკი", value: "Senaki" }
    ],

    "სამცხე-ჯავახეთი": [
      { label: "ახალციხე", value: "Akhaltsikhe" },
      { label: "ბორჯომი", value: "Borjomi" },
      { label: "ახალქალაქი", value: "Akhalkalaki" }
    ],

    სვანეთი: [
      { label: "მესტია", value: "Mestia" }
    ],

    ლეჩხუმი: [
      { label: "ცაგერი", value: "Tsageri" }
    ],

    აფხაზეთი: [
      { label: "სოხუმი", value: "Sukhumi" },
      { label: "გაგრა", value: "Gagra" }
    ],

    რაჭა: [
      { label: "ამბროლაური", value: "Ambrolauri" },
      { label: "ონი", value: "Oni" }
    ],

    "ქვემო ქართლი": [
      { label: "რუსთავი", value: "Rustavi" },
      { label: "მარნეული", value: "Marneuli" },
      { label: "ბოლნისი", value: "Bolnisi" }
    ],

    "შიდა ქართლი": [
      { label: "გორი", value: "Gori" },
      { label: "ხაშური", value: "Khashuri" },
      { label: "ქარელი", value: "Kareli" }
    ],

    "მცხეთა-მთიანეთი": [
      { label: "მცხეთა", value: "Mtskheta" },
      { label: "დუშეთი", value: "Dusheti" },
      { label: "ყაზბეგი", value: "Kazbegi" }
    ]
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const userData = {
    ...formData,
    region: selectedRegion,
    city: selectedCity,
    latitude: null,
    longitude: null,
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/register",
      userData
    );

    console.log(response.data);
    alert("რეგისტრაცია წარმატებით დასრულდა");
    navigate("/login");
  } catch (error) {
    console.log(error);
    alert("რეგისტრაციის დროს მოხდა შეცდომა");
  }
};

  return (
    <div className="registerPage">
      <div className="registerPhone">

        <div className="smallLogo">
          <div className="smallShield"></div>
        </div>

        <h1>GeoAlert</h1>

        <p className="subtitle">
          დარეგისტრირდით და მიიღეთ
          <br />
          შეტყობინებები
        </p>

        <form className="registerForm" onSubmit={handleSubmit}>

          <label>სახელი</label>
          <input
              type="text"
              placeholder="სახელი"
              value={formData.first_name}
              onChange={(e) =>
                  setFormData({...formData, first_name: e.target.value})
              }
          />

          <label>გვარი</label>
          <input
              type="text"
              placeholder="გვარი"
              value={formData.last_name}
              onChange={(e) =>
                  setFormData({...formData, last_name: e.target.value})
              }
          />

          <label>ტელეფონი</label>
          <input
              type="tel"
              placeholder="+9955XXXXXXXX"
              value={formData.phone}
              onChange={(e) =>
                  setFormData({...formData, phone: e.target.value})
              }
          />

          <label>პაროლი</label>
          <input
              type="password"
              placeholder="პაროლი"
              value={formData.password}
              onChange={(e) =>
                  setFormData({...formData, password: e.target.value})
              }
          />

          <label>დაბადების თარიღი</label>
          <input
              type="date"
              value={formData.date_of_birth}
              onChange={(e) =>
                  setFormData({...formData, date_of_birth: e.target.value})
              }
          />

          <label>რეგიონი</label>

          <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedCity("");
              }}
          >
            <option value="">
              აირჩიეთ რეგიონი
            </option>

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
            <option value="">
              აირჩიეთ ქალაქი / მუნიციპალიტეტი
            </option>

            {selectedRegion &&
                citiesByRegion[selectedRegion].map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                ))}
          </select>

          <button type="button" className="mapBtn">
            რუკაზე არჩევა
          </button>

          <div className="termsRow">

            <input
                type="checkbox"
                checked={formData.accepted_terms}
                onChange={(e) =>
                    setFormData({...formData, accepted_terms: e.target.checked})
                }
            />

            <p>
              რეგისტრაციისას ვეთანხმები{" "}
              <span onClick={() => setModalType("rules")}>წესებს</span> და{" "}
              <span onClick={() => setModalType("terms")}>პირობებს</span>
            </p>

          </div>

          <button type="submit" className="submitBtn">
            რეგისტრაცია
          </button>

          <p className="loginText">
            უკვე გაქვთ ანგარიში?{" "}
            <Link to="/login">შესვლა</Link>
          </p>

        </form>
        {modalType && (
            <div className="modalOverlay">
            <div className="modalBox">
      <h2>{modalType === "rules" ? "წესები" : "პირობები"}</h2>

      <p>
        GeoAlert გამოიყენება ბუნებრივი კატასტროფების შესახებ
        ინფორმაციისა და რეკომენდაციების მისაღებად. მომხმარებელი
        ვალდებულია მიუთითოს სწორი პირადი და ლოკაციური მონაცემები.
      </p>

      <p>
        აპლიკაციაში ნაჩვენები გაფრთხილებები ეფუძნება ამინდის მონაცემებს
        და სისტემის რისკის ანალიზს. ინფორმაცია შეიძლება არ იყოს
        აბსოლუტურად ზუსტი.
      </p>

      <button type="button" onClick={() => setModalType(null)}>
        დახურვა
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default Register;