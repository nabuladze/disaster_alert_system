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
  const userName = "ნანა";
  const city = "თბილისი";

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

          <button
              className="bellButton"
              onClick={() => alert("შეტყობინებების ისტორია მალე დაემატება")}
          >
            <FiBell/>
          </button>
        </div>

        <h1 className="homeGreeting">გამარჯობა, {userName}</h1>

        <p className="locationText">თქვენი მდებარეობა: {city}</p>

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

        <p className="sectionTitle english">ახლომდებარე ქალაქები:</p>

        <div className={nearbyHasDanger ? "nearbyCard danger" : "nearbyCard safe"}>
          <div className="nearbyIcon"></div>
          <div>
            <p className="nearbySmall">ქალაქი: თბილისი</p>
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