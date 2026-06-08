import Logo from "../components/Logo";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiShield,
  FiMoreHorizontal,
  FiCheckCircle,
  FiDroplet,
  FiCloudRain,
  FiWind,
  FiSun,
  FiPlusSquare,
  FiMap,
} from "react-icons/fi";
import "./Advices.css";

function Advices() {
  const [modalType, setModalType] = useState(null);

  return (
    <div className="advicesPage">
      <div className="advicesPhone">
        <div className="advicesHeader">
          <Logo size="small" />
          <h1>GeoAlert</h1>
        </div>

        <h2 className="pageTitle">უსაფრთხოების რჩევები</h2>

        <p className="pageDescription">
          მზადყოფნა გადამწყვეტია, გაეცანით რეკომენდაციებს ბუნებრივი
          კატასტროფების დროს თქვენი და თქვენი ახლობლების უსაფრთხოებისთვის.
        </p>

        <div className="adviceCard">
          <div className="iconCircle blueBg">
            <FiDroplet className="cardIcon blue" />
          </div>
          <h3>წყალდიდობა</h3>
          <AdviceList
            items={[
              "მოერიდეთ მდინარეებს, ხევებს და დაბალ ტერიტორიებს",
              "არ გადაკვეთოთ დატბორილი გზები ფეხით ან ავტომობილით",
              "მიჰყევით საგანგებო სამსახურის მითითებებს",
              "საჭიროების შემთხვევაში დატოვეთ საფრთხის ზონა",
            ]}
          />
        </div>

        <div className="adviceCard">
          <div className="iconCircle orangeBg">
            <FiCloudRain className="cardIcon orange" />
          </div>
          <h3>ძლიერი ნალექი</h3>
          <AdviceList
            items={[
              "მოერიდეთ დატბორილ ქუჩებსა და მიწისქვეშა გადასასვლელებს",
              "შეამოწმეთ სახლის სახურავი და წყალგაყვანილობა",
              "მანქანით მოძრაობისას შეამცირეთ სიჩქარე",
              "გადაადგილებისას გამოიჩინეთ განსაკუთრებული სიფრთხილე",
            ]}
          />
        </div>

        <div className="adviceCard">
          <div className="iconCircle darkBlueBg">
            <FiWind className="cardIcon darkBlue" />
          </div>
          <h3>ძლიერი ქარი</h3>
          <AdviceList
            items={[
              "დარჩით შენობაში და დახურეთ ფანჯრები",
              "მოერიდეთ ხეებს, ბოძებსა და ელექტროგადამცემ ხაზებს",
              "აივნიდან და ეზოდან მოაშორეთ მსუბუქი ნივთები",
              "არ გახვიდეთ გარეთ აუცილებლობის გარეშე",
            ]}
          />
        </div>

        <div className="adviceCard">
          <div className="iconCircle heatBg">
            <FiSun className="cardIcon heat" />
          </div>
          <h3>მაღალი ტემპერატურა</h3>
          <AdviceList
            items={[
              "მიიღეთ საკმარისი რაოდენობის წყალი",
              "მოერიდეთ მზის პირდაპირ სხივებს 12:00 - 17:00 საათებში",
              "ატარეთ ღია ფერის და მსუბუქი ტანსაცმელი",
              "დარჩით გრილ და კარგად განიავებულ სივრცეში",
            ]}
          />
        </div>

        <div className="greenButtons">
          <button type="button" onClick={() => setModalType("firstAid")}>
            <FiPlusSquare />
            პირველადი დახმარება
          </button>

          <button type="button" onClick={() => setModalType("evacuation")}>
            <FiMap />
            საევაკუაციო
          </button>
        </div>

        {modalType && (
          <div className="adviceModalOverlay">
            <div className="adviceModal">
              <h2>
                {modalType === "firstAid"
                  ? "პირველადი დახმარება"
                  : "საევაკუაციო წესები"}
              </h2>

              {modalType === "firstAid" ? (
                <AdviceList
                  items={[
                    "დაზარალებულის მდგომარეობა შეაფასეთ მშვიდად",
                    "საჭიროების შემთხვევაში დაუყოვნებლივ დარეკეთ 112-ზე",
                    "სისხლდენისას დააჭირეთ სუფთა ქსოვილი ჭრილობას",
                    "დამწვრობისას დაზიანებული ადგილი გააგრილეთ სუფთა წყლით",
                    "არ მისცეთ დაზარალებულს წამალი ექიმის მითითების გარეშე",
                  ]}
                />
              ) : (
                <AdviceList
                  items={[
                    "აიღეთ პირადი დოკუმენტები და აუცილებელი ნივთები",
                    "დატოვეთ ტერიტორია მშვიდად და ორგანიზებულად",
                    "გაჰყევით ოფიციალური პირების მითითებებს",
                    "არ დაბრუნდეთ საფრთხის ზონაში ნებართვის გარეშე",
                    "წინასწარ იცოდეთ უსაფრთხო შეკრების ადგილი",
                  ]}
                />
              )}

              <button
                type="button"
                className="closeModal"
                onClick={() => setModalType(null)}
              >
                დახურვა
              </button>
            </div>
          </div>
        )}

        <div className="bottomNav">
          <Link to="/home" className="navItem">
            <FiHome />
            <p>მთავარი</p>
          </Link>

          <Link to="/profile" className="navItem">
            <FiUser />
            <p>პროფილი</p>
          </Link>

          <Link to="/advices" className="navItem active">
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

function AdviceList({ items }) {
  return (
    <ul className="adviceList">
      {items.map((item, index) => (
        <li key={index}>
          <FiCheckCircle />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default Advices;