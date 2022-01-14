import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import "../style/login.css";

function Registration() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();

    // const response = await fetch(
    //   "https://rent-vlk.herokuapp.com/accounts/signup/",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept": "application/json"
    //     },
    //     body: JSON.stringify({
    //       first_name: name,
    //       last_name: surname,
    //       phone_number: number,
    //       password: password,
    //   }),
    //   }
    // );
    // const res = await response.json()
    // console.log(res)
    navigate("/registration/confirm", { replace: true, state: number });
  };

  return (
    <>
      <>
        <div className="back">
          <Container>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <div className="main">
                <div className="register">
                  <form onSubmit={signUp}>
                    <label className="labelAuth" for="chk" aria-hidden="true">
                      Регистрация
                    </label>
                    <input
                      className="inputAuth"
                      type="name"
                      value={name}
                      placeholder="Имя"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="inputAuth"
                      type="surname"
                      value={surname}
                      placeholder="Фамилия"
                      onChange={(e) => setSurname(e.target.value)}
                    />
                    <input
                      className="inputAuth"
                      type="tel"
                      value={number}
                      placeholder="Номер телефона"
                      onChange={(e) => setNumber(e.target.value)}
                    />
                    <input
                      className="inputAuth"
                      type="password"
                      value={password}
                      placeholder="Пароль"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="buttonAuth" type="submit">
                      Регистрация
                    </button>
                  </form>
                </div>
              </div>
            </Grid>
          </Container>
        </div>
      </>
    </>
  );
}

export default Registration;
