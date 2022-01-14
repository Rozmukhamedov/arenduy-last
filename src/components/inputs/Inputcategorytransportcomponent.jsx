import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function InputCategoryTransport(props) {
  const [nameItem, setNameItem] = useState([]);
  useEffect(() => {
     fetch(`https://rent-vlk.herokuapp.com/v1/category/`)
      .then((res) => res.json())
      .then((data) => {
        setNameItem(data);
      });
  }, []);
   


  return (
    <TextField
      select
      label="Котегория"
      fullWidth
      value={props.category}
      onChange={(e) => props.setCategory(e.target.value)}
    >
      {nameItem.map((option) => (
        <MenuItem key={option.value} value={option.slug}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
export default InputCategoryTransport;
