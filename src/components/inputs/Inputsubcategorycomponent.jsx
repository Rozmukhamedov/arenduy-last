import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function InputSubcategory(props) {
  const [nameItem, setNameItem] = useState([]);
  useEffect(() => {
     fetch(`https://rent-vlk.herokuapp.com/v1/category/real_estate/`)
      .then((res) => res.json())
      .then((data) => {
        setNameItem(data);
      });
  }, []);
   
  return (
    <TextField
      select
      label="Подкотегория"
      fullWidth
      value={props.subcategory}
      onChange={(e) => props.setSubcategory(e.target.value)}
    >
      {nameItem.map((option) => (
        <MenuItem key={option.value} value={option.slug}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
export default InputSubcategory;
