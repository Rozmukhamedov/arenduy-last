import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomSmpButton from "../components/CustomSmpButton";
import { URLACC } from "../constants/applicationConstants";
import useCustomFetcher from "../hooks/useCustomFetcher";
import "../style/login.css";

function Confirm() {
  const [code, setCode] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [ConfirmError, ConfirmIsLoading, ConfirmFetcher] = useCustomFetcher();

  const ConfirmAcc = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        phone_number: location.state,
        code: code,
      }),
    };

    ConfirmFetcher(
      (response) => {
        alert(response);
      },
      `${URLACC}/reset-password/`,
      requestOptions
    );
    navigate("/", { replace: true });
  };

  return (
    <div className="confirm-border">
      <h3>Подтверждение</h3>
      <form onSubmit={ConfirmAcc}>
        <input
          required
          type="number"
          value={code}
          placeholder="Код подтверждение"
          onChange={(e) => setCode(e.target.value)}
        />
        <CustomSmpButton
          textBtn={"Подтверждение"}
          background={"#bb9de5"}
          fontSize={"16px"}
          color={"#fff"}
          padding={"10px 10px"}
          border={"none"}
          borderRadius={"5px"}
          height={"40px"}
          width={"100%"}
          margin={"10px 0 0 5px "}
        />
      </form>
    </div>
  );
}

export default Confirm;
