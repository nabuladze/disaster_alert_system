import Logo from "../components/Logo";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";

// რეგისტრაციის გვერდი
function Register() {
  // არჩეული რეგიონისა და ქალაქის state-ები
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  // წესებისა და პირობების modal-ის ტიპი
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();
  // რეგისტრაციის ფორმის მონაცემები
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "+995",
    date_of_birth: "",
    password: "",
    accepted_terms: false,
  });

  // რეგიონებისა და შესაბამისი ქალაქების სია
  // label გამოიყენება UI-ში ქართულად საჩვენებლად,
  // value კი backend/OpenWeather-სთვის ინგლისურად
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
// რეგისტრაციის ფორმის გაგზავნა backend-ში
const handleSubmit = async (e) => {
  e.preventDefault();

  const userData = {
    ...formData,
    region: selectedRegion,
    city: selectedCity,
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/register",
      userData
    );
// backend-იდან დაბრუნებული error-ის დამუშავება
if (response.data.error) {
  if (response.data.error === "Phone number already registered") {
    alert("ეს ტელეფონის ნომერი უკვე რეგისტრირებულია");
  } else if (
    response.data.error === "You must accept terms and conditions"
  ) {
    alert("გთხოვთ დაეთანხმოთ წესებს და პირობებს");
  } else {
    alert("რეგისტრაციისას მოხდა შეცდომა");
  }

  return;
}

    console.log(response.data);

    alert("რეგისტრაცია წარმატებით დასრულდა");
    // წარმატებული რეგისტრაციის შემდეგ გადასვლა login გვერდზე
    navigate("/login");
} catch (error) {
  console.log(error);

  const errorDetail = error.response?.data?.detail;
  // Pydantic validation error-ების დამუშავება
  if (Array.isArray(errorDetail)) {
    const passwordError = errorDetail.find(
      (item) => item.loc && item.loc.includes("password")
    );

    const phoneError = errorDetail.find(
      (item) => item.loc && item.loc.includes("phone")
    );

    if (passwordError) {
      alert("პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს");
      return;
    }

    if (phoneError) {
      alert("ასეთი ნომერი არ არსებობს");
      return;
    }
  }

  alert("რეგისტრაციის დროს მოხდა შეცდომა");
}
};

  return (
    <div className="registerPage">
      <div className="registerPhone">
        <div className="registerLogoRow">
          <Logo size="small" />
          <h1>GeoAlert</h1>
        </div>

        <p className="subtitle">
          დარეგისტრირდით და მიიღეთ
          <br />
          შეტყობინებები
        </p>
        {/* რეგისტრაციის ფორმა */}
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>სახელი</label>
          <input
              type="text"
              placeholder="სახელი"
              required
              value={formData.first_name}
              onChange={(e) =>
                  setFormData({...formData, first_name: e.target.value})
              }
          />

          <label>გვარი</label>
          <input
              type="text"
              placeholder="გვარი"
              required
              value={formData.last_name}
              onChange={(e) =>
                  setFormData({...formData, last_name: e.target.value})
              }
          />
          {/* ტელეფონის ნომერი იწყება +995-ით */}
          <label>ტელეფონი</label>
          <input
              type="tel"
              placeholder="+9955XXXXXXXX"
              required
              maxLength={13}
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value;

                if (!value.startsWith("+995")) {
                  setFormData({...formData, phone: "+995"});
                  return;
                }

                setFormData({...formData, phone: value});
              }}
          />

          <label>პაროლი</label>
          <input
              type="password"
              placeholder="პაროლი"
              required
              value={formData.password}
              onChange={(e) =>
                  setFormData({...formData, password: e.target.value})
              }
          />

          <label>დაბადების თარიღი</label>
          <input
              type="date"
              required
              value={formData.date_of_birth}
              onChange={(e) =>
                  setFormData({...formData, date_of_birth: e.target.value})
              }
          />
          {/* რეგიონის არჩევა */}
          <label>რეგიონი</label>
          <select
              required
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
          {/* არჩეული რეგიონის მიხედვით ქალაქების ჩვენება */}
          <label>ქალაქი / მუნიციპალიტეტი</label>
          <select
              required
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedRegion}
          >
            <option value="">აირჩიეთ ქალაქი / მუნიციპალიტეტი</option>

            {selectedRegion &&
                citiesByRegion[selectedRegion].map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                ))}
          </select>
          {/* წესებსა და პირობებზე თანხმობა */}
          <div className="termsRow">
            <input
                type="checkbox"
                required
                checked={formData.accepted_terms}
                onChange={(e) =>
                    setFormData({
                      ...formData,
                      accepted_terms: e.target.checked,
                    })
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
            უკვე გაქვთ ანგარიში? <Link to="/login">შესვლა</Link>
          </p>
        </form>
        {/* წესებისა და პირობების modal ფანჯარა */}
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