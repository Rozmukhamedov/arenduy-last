import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import '../style/login.css';

function Confirm() {
  const [code, setCode] = useState("");

  const navigate = useNavigate()

  console.log(useLocation())

  async function signUp(e) {
    e.preventDefault();
  

    const response = await fetch(
      "https://rent-vlk.herokuapp.com/accounts/reset-password/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          // phone_number: number,
          code: code,
        }),
      }
    );
    const res = await response.json()
    console.log(res)
    navigate("/login")
  }

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
              <div className="main confirm">
                <div className="regiser">
                  <form onSubmit={signUp}>
                    <label className="labelAuth" for="chk" aria-hidden="true">
                      Регистрация
                    </label>
                    <input
                    className="inputAuth"
                      type="number"
                      value={code}
                      placeholder="Код подтверждение"
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <button className="buttonAuth" type="submit">Регистрация</button>
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

export default Confirm;
