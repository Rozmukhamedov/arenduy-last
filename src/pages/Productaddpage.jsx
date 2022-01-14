import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Container, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";

function ProductAdd() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container>
        <h2 style={{ color: "rgb(125, 125, 125)" }}>Добавить продукт</h2>

        <hr />
        <Box
          style={{ borderBotton: "1px solid #000" }}
          x
          sx={{ width: "100%", bgcolor: "background.paper" }}
        >
          <Tabs onChange={handleChange}>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="real-estate"
            >
              <Tab value={0} label="Недвижимость" wrapped />
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="transport"
            >
              <Tab value={1} label="Транспорт" />
            </Link>
          </Tabs>
        </Box>
        <Outlet />
      </Container>
    </>
  );
}

export default ProductAdd;
