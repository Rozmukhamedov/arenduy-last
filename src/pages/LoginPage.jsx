import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import CustomSmpButton from "../components/CustomSmpButton";
import { URLACC } from "../constants/applicationConstants";
import { useAuth } from "../hooks/useAuth";
import useCustomFetcher from "../hooks/useCustomFetcher";
import "../style/login.css";
import { useAlert } from "react-alert";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();

  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const { signin, setCookie, setIsLoggedIn } = useAuth();

  const fromPage = location.state?.from?.pathname || "/";

  const [LoginError, LoginIsLoading, LoginFetcher] = useCustomFetcher();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phone_number,
        password: password,
      }),
    };

    LoginFetcher(
      (res) => {
        if (
          res.detail != "No active account found with the given credentials"
        ) {
          setCookie("tokens", JSON.stringify(res));
          setIsLoggedIn(true);
          signin(() => navigate(fromPage, { replace: true }));
        } else {
          alert.error("Не правильно!");
        }
      },
      `${URLACC}/login/`,
      requestOptions
    );
  };

  return (
    <div className="login-border">
      <h3>Войти</h3>
      <form onSubmit={handleSubmit}>
        <label for="chk" aria-hidden="true">
          Номер телефона
        </label>
        <input
          required
          className="inputAuth"
          type="tel"
          value={phone_number}
          onChange={({ target }) => setPhone_number(target.value)}
        />
        <label for="chk" aria-hidden="true">
          Пароль
        </label>
        <input
          required
          className="inputAuth"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <div className="login-flex">
          <CustomSmpButton
            textBtn={"Вход"}
            background={"#bb9de5"}
            fontSize={"16px"}
            color={"#fff"}
            padding={"10px 10px"}
            border={"none"}
            borderRadius={"5px"}
            height={"40px"}
            width={"120px"}
            margin={"0 40px 0 5px "}
          />
          <div>
            {/* <Link className="login-link" to="/registration">
              Забыл пароль?
            </Link> */}
            <Link className="login-link" to="/registration">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
