import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomSmpButton from "../components/CustomSmpButton";
import { URLACC } from "../constants/applicationConstants";
import useCustomFetcher from "../hooks/useCustomFetcher";
import "../style/login.css";

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [phone_number, setPhone_number] = useState("");

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
      }),
    };

    LoginFetcher(
      () => {
        navigate("/registration/confirm", {
          replace: true,
          state: phone_number,
        });
      },
      `${URLACC}/reset-password/`,
      requestOptions
    );
  };

  return (
    <div className="login-border" style={{ height: "250px" }}>
      <h3 style={{ marginBottom: "30px" }}>Забыли пароль?</h3>
      <form onSubmit={handleSubmit}>
        <label for="chk" aria-hidden="true">
          Номер телефона
        </label>
        <input
          required
          className="inputAuth"
          type="tel"
          onChange={({ target }) => setPhone_number(target.value)}
        />
        <Link to="confirm">
          <CustomSmpButton
            textBtn={"Изменить"}
            background={"#bb9de5"}
            fontSize={"16px"}
            color={"#fff"}
            padding={"10px 10px"}
            border={"none"}
            borderRadius={"5px"}
            height={"40px"}
            width={"100%"}
            margin={"20px 0 0 0"}
          />
        </Link>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
