import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function InputSubcategoryTransport(props) {
  const [nameItem, setNameItem] = useState([]);
  useEffect(() => {
    fetch(`https://rent-vlk.herokuapp.com/v1/category/${props.title}/`)
      .then((res) => res.json())
      .then((data) => {
        setNameItem(data);
      });
  }, []);

  // const func = async () => {
  //   const test1 = func1();
  //   const test2 = func1();
  //   const test3 = func1();

  //   const [test1Result, test2Result, test3Result] = await Promice.all(
  //     test1,
  //     test2,
  //     test3
  //   );
  // };

  return (
    <TextField
      style={{ width: "200px" }}
      select
      label="Подкотегория"
      fullWidth
      value={props.subTitle}
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
export default InputSubcategoryTransport;
