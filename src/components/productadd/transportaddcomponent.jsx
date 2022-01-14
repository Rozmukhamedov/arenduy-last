import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import "../../style/transport.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import InputSubcategoryTransport from "../inputs/Inputsubcategorytransportcomponent";
import InputBrand from "../inputs/Inputbrandcomponent";
import InputCity from "../inputs/Inputbodytypecomponent";

function TransportAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subcategory, setSubcategory] = useState("car");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [draft, setDraft] = useState(false);
  const [multipleFiles, setMultipleFiles] = useState("");
  const [brand, setBrand] = useState("bmw");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [bodytype, setBodytype] = useState("");
  const [fueltype, setFueltype] = useState("");
  const [yearissue, setYearissue] = useState("");
  const [transmission, setTransmission] = useState("");
  const [aircondition, setAircondition] = useState("");
  const [position, setPosition] = useState("");
  const [mileage, setMileage] = useState("");

  const [cookies] = useCookies(["tokens"]);
  const accessToken = cookies.tokens.access;

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://rent-vlk.herokuapp.com/v1/product/add/transport/",
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }),
        body: JSON.stringify({
          product: {
            image: multipleFiles,
            title: title,
            description: description,
            price: price,
            address: address,
            city: city,
            draft: draft,
            subcategory: subcategory,
          },
          brand: brand,
          model: model,
          color: color,
          body_type: bodytype,
          fuel_type: fueltype,
          year_issue: yearissue,
          transmission: transmission,
          air_condition: aircondition,
          position: position,
          mileage: mileage,
        }),
      }
    );
    navigate("/");
    // navigate("/");
    const data = await response.json();
    console.log(data);
    if (response.status == 201) {
      fetch(`https://rent-vlk.herokuapp.com/v1/upload_image/${data}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }),
        body: JSON.stringify({}),
      });
    }
  };

  return (
    <div className="realBox">
      <form onSubmit={addProduct}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Названия"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputSubcategoryTransport
              setSubcategory={setSubcategory}
              subcategory={subcategory}
              title="transport"
              slug=""
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputBrand
              setTitle={setBrand}
              brand={brand}
              title="brand"
              slug=""
              name="Бренд"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InputBrand
              setTitle={setModel}
              model={model}
              title="model"
              slug={brand}
              name="Модель"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InputBrand
              setTitle={setBodytype}
              model={bodytype}
              title="body_type"
              slug=""
              name="Кузов"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputBrand
              setTitle={setColor}
              model={color}
              title="color"
              slug=""
              name="Цвет"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Тип топлива"
              required
              fullWidth
              value={fueltype}
              onChange={(e) => setFueltype(e.target.value)}
            >
              <MenuItem key={1} value="benzin">
                Бензин
              </MenuItem>
              <MenuItem key={2} value="elektr">
                Электро
              </MenuItem>
              <MenuItem key={3} value="dizel">
                Дизел
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Коробка передач"
              required
              fullWidth
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            >
              <MenuItem key={1} value="mexanika">
                Механика
              </MenuItem>
              <MenuItem key={2} value="avtomat">
                Автомат
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Позиция"
              required
              fullWidth
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            >
              <MenuItem key={1} value="first">
                1
              </MenuItem>
              <MenuItem key={2} value="second">
                2
              </MenuItem>
              <MenuItem key={2} value="third">
                3
              </MenuItem>
              <MenuItem key={2} value="fourth">
                4
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              required
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              label="Пробег"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              required
              value={yearissue}
              onChange={(e) => setYearissue(e.target.value)}
              label="Год выпуска"
              placeholder="2020"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Кондиционер"
              required
              fullWidth
              value={aircondition}
              onChange={(e) => setAircondition(e.target.value)}
            >
              <MenuItem key={1} value="True">
                Да
              </MenuItem>
              <MenuItem key={2} value="False">
                Нет
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="outlined-textarea"
              label="Описания"
              fullWidth
              required
              minRows="8"
              maxRows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              accept="image/jpeg"
              multiple
              type="file"
              onChange={(e) => MultipleFileChange(e)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Цена"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <hr style={{ marginTop: "30px" }} />
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={4}>
            <InputCity setCity={setCity} city={city} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Адресс"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button style={{ margin: "20px 0 50px 0 " }} variant="contained">
          Добавить
        </Button>
      </form>
    </div>
  );
}

export default TransportAdd;
