import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function InputBrand(props) {
  const [nameItem, setNameItem] = useState([]);

  useEffect(() => { 
    fetch(`http://rent-vlk.herokuapp.com/v1/transport/${props.title}/${props.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setNameItem(data);
        console.log(data)
      });
  }, []);
  
  return (
    <TextField
      select
      label={props.name}
      required
      fullWidth
      value={props.brand}
      onChange={(e) => props.setTitle(e.target.value)}
    >
      {nameItem.map((option) => (
        <MenuItem key={option.value} value={option.slug}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
export default InputBrand;
