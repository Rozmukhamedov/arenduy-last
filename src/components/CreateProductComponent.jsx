import { MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import "../style/createproduct.css";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { URL } from "../constants/applicationConstants";
import CustomInput from "./inputs/CustomInput";
import CustomSmpButton from "./CustomSmpButton";
import useCustomFetcher from "../hooks/useCustomFetcher";
import FileUpload from "./ui/FileUploadComponent";

function CreateProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("real_estate");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // real_estate

  const [totalarea, setTotalarea] = useState("");
  const [rooms, setRooms] = useState("");
  const [floor, setFloor] = useState("");

  const [tag1, setTag1] = useState("Дом");
  const [tag2, setTag2] = useState("Узбекистон");

  // transport

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

  const [tag3, setTag3] = useState("Машина");
  const [tag4, setTag4] = useState("Узбекистон");

  // address

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("toshkent");
  const [draft, setDraft] = useState(false);

  const location = useGeoLocation();
  const lat = [location.lat, location.lng];
  const all = lat.join(", ");

  const [cookies] = useCookies(["tokens"]);
  const [accessToken, setAccessToken] = useState(cookies?.tokens?.access);

  const [newUserInfo, setNewUserInfo] = useState([]);

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, Images: files });

  console.log(newUserInfo);

  const [createProductsError, createProductsIsLoading, createProductsFetcher] =
    useCustomFetcher();

  useEffect(() => {
    console.log(category);
  }, [category]);

  // const [multipleFiles, setMultipleFiles] = useState();

  // const MultipleFileChange = (e) => {
  //   setMultipleFiles(e.target.files);
  // };

  const createProduct = (e) => {
    e.preventDefault();
    if (category == "real_estate") {
      const requestOptions = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }),
        body: JSON.stringify({
          product: {
            title: title,
            description: description,
            price: price,
            address: address,
            city: city,
            draft: draft,
            subcategory: subcategory,
            location: all,
            tags: [tag1, tag2],
          },
          total_area: totalarea,
          rooms: rooms,
          floor: floor,
        }),
      };

      createProductsFetcher(
        (data) => {
          console.log(data);
        },
        `${URL}/${category}/${subcategory}/add/`,
        requestOptions
      );
    } else {
      const requestOptions = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }),
        body: JSON.stringify({
          product: {
            image: newUserInfo,
            title: title,
            description: description,
            price: price,
            address: address,
            city: city,
            draft: false,
            subcategory: subcategory,
            tags: [tag3, tag4],
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
      };

      createProductsFetcher(
        (data) => {
          console.log(data);
        },
        `${URL}/${category}/${subcategory}/add/`,
        requestOptions
      );
    }

    // try {
    //   const response = await fetch(
    //     `${URL}/real_estate/flat/add/
    //   `,
    //     {
    //       method: "POST",
    //       headers: new Headers({
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${accessToken}`,
    //       }),
    //       body: JSON.stringify({
    //         product: {
    //           title: title,
    //           description: description,
    //           price: price,
    //           address: address,
    //           city: city,
    //           draft: draft,
    //           subcategory: subcategory,
    //           location: all,
    //           tags: [tag1, tag2],
    //         },
    //         total_area: totalarea,
    //         rooms: rooms,
    //         floor: floor,
    //       }),
    //     }
    //   );

    //   const dataSlug = await response.json();

    //   if (response.status === 201) {
    //     console.log("123");
    //     const data = new FormData();
    //     data.append("media[]", multipleFiles[0], multipleFiles[0]);

    //     const res = await fetch(`${URL}/upload_image/${dataSlug}`, {
    //       method: "POST",
    //       headers: new Headers({
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${accessToken}`,
    //       }),
    //       body: data,
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="create-product">
      <h2>Добавить Объявления</h2>
      <form onSubmit={createProduct}>
        <div className="create-product-border">
          <TextField
            className="input"
            required
            onChange={(e) => setTitle(e.target.value)}
            label="Названия"
            variant="outlined"
          />
          <div>
            <CustomInput
              className="input"
              title={category}
              label="Категория"
              url={`${URL}/category/`}
              setValue={setCategory}
              margin="7px 20px 7px 0"
            />
            <CustomInput
              className="input"
              title={subcategory}
              label="Подкатегория"
              url={`${URL}/category/${category}/`}
              setValue={setSubcategory}
              category={category}
            />
          </div>
        </div>

        <div className="create-product-border">
          <FileUpload
            accept=".jpg,.png,.jpeg"
            multiple
            updateFilesCb={updateUploadedFiles}
          />
        </div>

        <div className="create-product-border">
          <h4>Описание</h4>
          <TextField
            id="outlined-textarea"
            fullWidth
            required
            minRows="8"
            maxRows="5"
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
          <TextField
            required
            className="input"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            label="Цена"
            variant="outlined"
          />
        </div>
        {category != "transport" ? (
          <div className="create-product-flex">
            <TextField
              className="input"
              required
              onChange={(e) => setTotalarea(e.target.value)}
              label="Площадь м^2"
              variant="outlined"
            />
            <TextField
              className="input"
              type="number"
              required
              onChange={(e) => setRooms(e.target.value)}
              label="Команата"
              variant="outlined"
            />
            <TextField
              className="input"
              type="number"
              required
              onChange={(e) => setFloor(e.target.value)}
              label="Этаж"
              variant="outlined"
            />
          </div>
        ) : (
          <div className="create-product-flex">
            <CustomInput
              className="input"
              label="Бранд"
              url={`${URL}/transport/brand/`}
              setValue={setBrand}
            />
            <CustomInput
              className="input"
              label="Модел"
              url={`${URL}/transport/model/${brand}`}
              setValue={setModel}
            />
            <CustomInput
              className="input"
              label="Кузов"
              url={`${URL}/transport/body_type/`}
              setValue={setBodytype}
            />
            <CustomInput
              className="input"
              label="Цвет"
              url={`${URL}/transport/color/`}
              setValue={setColor}
            />
            <TextField
              select
              className="input"
              label="Тип топлива"
              required
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
            <TextField
              className="input"
              select
              label="Коробка передач"
              required
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
            <TextField
              select
              label="Позиция"
              required
              className="input"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
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
            <TextField
              className="input"
              type="number"
              required
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              label="Пробег"
              variant="outlined"
            />
            <TextField
              className="input"
              type="number"
              required
              value={yearissue}
              onChange={(e) => setYearissue(e.target.value)}
              label="Год выпуска"
              placeholder="2020"
              variant="outlined"
            />
            <TextField
              select
              label="Кондиционер"
              required
              className="input"
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
          </div>
        )}

        <div className="create-product-border">
          <h4>Адресс</h4>
          <div>
            <CustomInput
              className="input"
              label="Город"
              url={`${URL}/city/`}
              setValue={setCity}
              margin="7px 30px 7px 0"
            />

            <TextField
              className="input"
              required
              onChange={(e) => setAddress(e.target.value)}
              label="Адресс"
              variant="outlined"
            />
          </div>
          {category == "real_estate" ? (
            <YMaps>
              <div className="map">
                <Map
                  width="100%"
                  height="300px"
                  defaultState={{
                    center: [location.lat, location.lng],
                    zoom: 15,
                  }}
                >
                  <Placemark geometry={[location.lat, location.lng]} />
                </Map>
              </div>
            </YMaps>
          ) : (
            <div></div>
          )}
        </div>
        <CustomSmpButton
          textBtn="Добавить"
          background="#bb9de5"
          fonstsSize="16px"
          color="#fff"
          padding="10px 10px"
          border="none"
          borderRadius="5px"
          margin="0 0 5px 0"
          width="140px"
          height="40px"
        />
      </form>
    </div>
  );
}

export default CreateProduct;
