import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useCustomFetcher from "../../hooks/useCustomFetcher";

function CustomInput({
  url,
  label,
  className,
  setValue,
  width,
  height,
  margin,
  value,
  category,
}) {
  const [nameItem, setNameItem] = useState([]);
  const [inputError, inputIsLoading, inputFetcher] = useCustomFetcher();

  useEffect(() => {
    inputFetcher((data) => setNameItem(data), url, {});
  }, [category]);

  if (inputIsLoading) {
    return <TextField disabled id="outlined-disabled" label={label} />;
  }

  if (inputError) {
    return <TextField disabled id="outlined-disabled" label={label} required />;
  }

  return (
    <TextField
      style={{
        width,
        height,
        margin,
      }}
      className={className}
      required
      select
      label={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {nameItem.map((option) => (
        <MenuItem key={option.value} value={option.slug}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
export default CustomInput;
