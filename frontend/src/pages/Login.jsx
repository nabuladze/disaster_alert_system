import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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

      localStorage.setItem(
        "token",
        response.data.access_token
      );


      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("ტელეფონი ან პაროლი არასწორია");
    }
  };

    return (
  <div className="loginPage">
    <div className="loginPhone">
      <div className="logoCircle">
        <div className="shield"></div>
      </div>

      <h1>GeoAlert</h1>
      <div className="line"></div>

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