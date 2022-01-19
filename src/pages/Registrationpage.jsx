import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/registration.css";
import CustomSmpButton from "../components/CustomSmpButton";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { URLACC } from "../constants/applicationConstants";

function Registration() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [registationError, registrationIsLoading, registrationFetcher] =
    useCustomFetcher();

  const signUp = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        first_name: name,
        last_name: surname,
        phone_number: number,
        password: password,
      }),
    };

    registrationFetcher(
      () => {
        navigate("/registration/confirm", { replace: true, state: number });
      },
      `${URLACC}/signup/`,
      requestOptions
    );
  };

  return (
    <div className="registration-border">
      <h3>Регистрация</h3>
      <form onSubmit={signUp}>
        <input
          required
          type="name"
          value={name}
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="surname"
          value={surname}
          placeholder="Фамилия"
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          required
          type="tel"
          value={number}
          placeholder="Номер телефона"
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          required
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="registration-flex">
          <CustomSmpButton
            textBtn={"Регистрация"}
            background={"#bb9de5"}
            fontSize={"16px"}
            color={"#fff"}
            padding={"10px 10px"}
            border={"none"}
            borderRadius={"5px"}
            height={"40px"}
            width={"120px"}
          />

          <Link to="/login">
            <CustomSmpButton
              textBtn={"Вход"}
              color={"#bb9de5"}
              fontSize={"16px"}
              padding={"10px 10px"}
              border={"none"}
              borderRadius={"5px"}
              height={"40px"}
            />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Registration;
