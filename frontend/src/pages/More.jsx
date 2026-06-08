import Logo from "../components/Logo";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiShield,
  FiMoreHorizontal,
  FiInfo,
  FiPhone,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import "./More.css";

function More() {
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();

const handleLogout = () => {
  const confirmLogout = window.confirm("ნამდვილად გსურთ ანგარიშიდან გასვლა?");

  if (confirmLogout) {
    localStorage.removeItem("token");
    navigate("/login");
  }
};

  return (
      <div className="morePage">
        <div className="morePhone">
          <div className="moreHeader">
            <Logo size="small"/>
            <h1>GeoAlert</h1>
          </div>

        <h2 className="moreTitle">მეტი</h2>
        <p className="moreSubtitle">სარეგულაციო ინფორმაცია და პარამეტრები</p>

        <div className="moreCard" onClick={() => setModalType("about")}>
          <div className="moreIconBox">
            <FiInfo/>
          </div>

          <div className="moreCardText">
            <h3>აპლიკაციის შესახებ</h3>
            <p>ინფორმაცია GeoAlert-ის მიზნისა და ფუნქციების შესახებ</p>
          </div>

          <FiChevronRight className="arrowIcon"/>
        </div>

        <div className="moreCard" onClick={() => setModalType("numbers")}>
          <div className="moreIconBox">
            <FiPhone/>
          </div>

          <div className="moreCardText">
            <h3>საგანგებო ნომრები</h3>
            <p>საჭირო საკონტაქტო ნომრები საგანგებო შემთხვევებისთვის</p>
          </div>

          <FiChevronRight className="arrowIcon"/>
        </div>

        <div className="moreCard" onClick={handleLogout}>
          <div className="moreIconBox">
            <FiLogOut/>
          </div>

          <div className="moreCardText">
            <h3>გამოსვლა</h3>
            <p>ანგარიშიდან გასვლა</p>
          </div>

          <FiChevronRight className="arrowIcon"/>
        </div>

        <div className="versionBox">
          <Logo size="large" />
          <p>ვერსია 1.0.0</p>
        </div>

        {modalType && (
            <div className="moreModalOverlay">
              <div className="moreModal">
                <h2>
                  {modalType === "about"
                      ? "აპლიკაციის შესახებ"
                      : "საგანგებო ნომრები"}
                </h2>

                {modalType === "about" ? (
                    <p>
                      GeoAlert არის ბუნებრივი კატასტროფების ადრეული გაფრთხილების
                      სისტემა, რომელიც მომხმარებლებს აწვდის ინფორმაციას ამინდისა
                      და შესაძლო საფრთხეების შესახებ მათი მდებარეობის მიხედვით.
                    </p>
                ) : (
                    <div className="numbersList">
                      <p><strong>112</strong> — ერთიანი საგანგებო სამსახური</p>

                      <p><strong>113</strong> — სასწრაფო სამედიცინო დახმარება</p>

                      <p><strong>111</strong> — სახანძრო სამსახური</p>

                      <p><strong>114</strong> — გაზის საავარიო სამსახური</p>

                      <p><strong>122</strong> — საპატრულო პოლიცია</p>

                      <p><strong>125</strong> — დაცვის პოლიცია</p>
                    </div>
                )}

                <button onClick={() => setModalType(null)}>დახურვა</button>
              </div>
            </div>
        )}

        <div className="bottomNav">
          <Link to="/home" className="navItem">
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

          <Link to="/more" className="navItem active">
            <FiMoreHorizontal/>
            <p>მეტი</p>
          </Link>
        </div>
      </div>
</div>
)
  ;
}

export default More;