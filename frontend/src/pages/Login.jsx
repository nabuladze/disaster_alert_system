import Logo from "../components/Logo";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

// ავტორიზაციის გვერდი
function Login() {
  const navigate = useNavigate();

  // მომხმარებლის მიერ შეყვანილი მონაცემების state-ები
  const [phone, setPhone] = useState("+995");
  const [password, setPassword] = useState("");

  // login form-ის გაგზავნა backend-ში
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          phone,
          password,
        }
      );

    // თუ backend აბრუნებს შეცდომას ან token არ არსებობს,
    // მომხმარებელი სისტემაში ვერ შედის
    if (response.data.error || !response.data.access_token) {
      alert("ტელეფონის ნომერი ან პაროლი არასწორია");
      return;
    }

    // წარმატებული ავტორიზაციის შემთხვევაში JWT token ინახება localStorage-ში
    localStorage.setItem(
      "token",
      response.data.access_token
    );

    // მომხმარებლის გადაყვანა მთავარ გვერდზე
    navigate("/home");
  } catch (error) {
    console.log(error);
    alert("ტელეფონის ნომერი ან პაროლი არასწორია");
  }
};

    return (
  <div className="loginPage">
    <div className="loginPhone">
      <Logo size="medium" />

      <h1>GeoAlert</h1>

      <form className="loginForm" onSubmit={handleLogin}>
        <label>ტელეფონი</label>
        <input
          type="tel"
          placeholder="+9955XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>პაროლი</label>
        <input
          type="password"
          placeholder="პაროლი"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="loginButton">
          შესვლა
        </button>

        <button
          type="button"
          className="forgotPassword"
          onClick={() => alert("ფუნქცია მალე დაემატება")}
        >
          დაგავიწყდათ პაროლი?
        </button>

        <div className="orRow">
          <span></span>
          <p>ან</p>
          <span></span>
        </div>

        <p className="registerLink">
          არ გაქვთ ანგარიში?{" "}
          <Link to="/register">რეგისტრაცია</Link>
        </p>
      </form>
    </div>
  </div>
  );
}

export default Login;