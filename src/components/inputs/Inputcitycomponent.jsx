import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function InputCity({ setCity, city }) {
  const [nameItem, setNameItem] = useState([]);

  useEffect(() => {
    fetch(`https://rent-vlk.herokuapp.com/v1/city/`)
    .then((res) => res.json())
    .then((data) => {
      setNameItem(data);
    });
   
  }, []);

  return (
    <TextField
      fullWidth
      required
      select
      label="Город"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    >
      {nameItem.map((option) => (
        <MenuItem key={option.value} value={option.slug}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
export default InputCity;
