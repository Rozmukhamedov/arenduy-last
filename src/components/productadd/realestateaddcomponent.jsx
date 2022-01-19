import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";
import "../../style/realadd.css";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import InputSubcategory from "../inputs/Inputsubcategorycomponent";
import InputCity from "../inputs/Inputcitycomponent";
import { URL } from "../../constants/applicationConstants";

function RealestateAdd() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subcategory, setSubcategory] = useState("flat");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [totalarea, setTotalarea] = useState("");
  const [rooms, setRooms] = useState("");
  const [floor, setFloor] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("toshkent");
  const [draft, setDraft] = useState(false);

  const [tag1, setTag1] = useState("Дом");
  const [tag2, setTag2] = useState("Тошкент");

  const location = useGeoLocation();
  const lat = [location.lat, location.lng];
  const all = lat.join(", ");

  const [cookies] = useCookies(["tokens"]);
  const accessToken = cookies.tokens.access;

  const [multipleFiles, setMultipleFiles] = useState();

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    // const formData = new FormData();

    // for (let i = 0; i < multipleFiles.length; i++) {
    //   formData.append("files", multipleFiles);
    // }
    // multipleFiles.forEach(image => console.log(image));

    try {
      const response = await fetch(
        `${URL}/real_estate/flat/add/
      `,
        {
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
        }
      );
      // navigate("/");
      const dataSlug = await response.json();
      console.log(dataSlug);
      console.log(response.status);

      if (response.status === 201) {
        console.log("123");
        const data = new FormData();
        data.append("media[]", multipleFiles[0], multipleFiles[0]);
        // for (let i = 0; i < multipleFiles.length; i++) {
        //   const img = multipleFiles[i];
        //   console.log("Iam in");
        //   console.log(img);

        //   data.append('media[]',img);

        // }

        const res = await fetch(`${URL}/upload_image/${dataSlug}`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          }),
          body: data,
        });
        console.log(res.status);
      }
    } catch (err) {
      console.log(err);
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
              // value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Названия"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InputSubcategory
              setSubcategory={setSubcategory}
              subcategory={subcategory}
              title="real-estate"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              required
              // value={totalarea}
              onChange={(e) => setTotalarea(e.target.value)}
              label="Площадь м^2"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="outlined-textarea"
              label="Описания"
              fullWidth
              required
              minRows="8"
              maxRows="8"
              // value={description}
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
              type="number"
              fullWidth
              required
              // value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              label="Команата"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              required
              type="number"
              // value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Цена"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              required
              // value={floor}
              onChange={(e) => setFloor(e.target.value)}
              label="Этаж"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <hr style={{ margin: "20px 0" }} />
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={4}>
            <InputCity setCity={setCity} city={city} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              required
              // value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Адресс"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <YMaps>
              <div>
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
          </Grid>
        </Grid>
        <Button
          style={{ margin: "20px 0 50px 0 " }}
          variant="contained"
          type="submit"
        >
          Добавить
        </Button>
      </form>
    </div>
  );
}

export default RealestateAdd;
