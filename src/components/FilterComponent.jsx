import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SEARCH_PARAM_NAMES, URL } from "../constants/applicationConstants";
import "../style/filter.css";
import CustomInput from "./inputs/CustomInput";
import CustomSmpButton from "./CustomSmpButton";
import { FaSearch } from "react-icons/fa";
import useWindowSize from "../hooks/useWindowSize";

function Filter({ urlCategory, urlSubcategory }) {
  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState(
    searchParams.get(SEARCH_PARAM_NAMES.TITLE) || ""
  );

  const [category, setCategory] = useState(urlCategory || "real_estate");
  const [subCategory, setSubCategory] = useState(urlSubcategory || "");
  const [city, setCity] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");

  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");

  // transport

  const [color, setColor] = useState("");
  const [fueltype, setFueltype] = useState("");
  const [transmission, setTransmission] = useState("");
  const [mileage, setMileage] = useState("");

  const { size } = useWindowSize();

  const [mobileFilter, setMobileFilter] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    category == "real_estate"
      ? navigate(
          `/filter?search=${title}&min_price=${minPrice}&max_price=${maxPrice}&min_area=${minArea}&max_area=${maxArea}&city=${city}&${subCategory}s_floor=${floor}&${subCategory}s_room=${room}/`,
          {
            state: `search/${subCategory}/?search=${title}&min_price=${minPrice}&max_price=${maxPrice}&min_area=${minArea}&max_area=${maxArea}&city=${city}&${subCategory}s_floor=${floor}&${subCategory}s_room=${room}/`,
          }
        )
      : navigate(
          `/filter?search=${title}&min_price=${minPrice}&max_price=${maxPrice}&${subCategory}s__transmission=${transmission}&${subCategory}s__fuel_type=${fueltype}&city=${city}&${subCategory}s__volor=${color}&${subCategory}s__mileage=${mileage}/`,
          {
            state: `search/${subCategory}/?search=${title}&min_price=${minPrice}&max_price=${maxPrice}&${subCategory}s__transmission=${transmission}&${subCategory}s__fuel_type=${fueltype}&city=${city}&${subCategory}s__volor=${color}&${subCategory}s__mileage=${mileage}/`,
          }
        );
  };

  return (
    <>
      {size > 600 ? (
        <div className="filter">
          <h2>????????????</h2>
          <div className="filter-box">
            <form onSubmit={handleSubmit} className="filter-form">
              <div className="filter-flex">
                <TextField
                  className="input"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="????????????????"
                  variant="outlined"
                  style={{
                    margin: "0 5px 10px 5px",
                  }}
                />

                <CustomInput
                  className="input"
                  label="??????????"
                  url={`${URL}/city/`}
                  setValue={setCity}
                  margin="0 5px 10px 5px"
                />

                <CustomInput
                  className="input"
                  title={category}
                  label="??????????????????"
                  url={`${URL}/category/`}
                  setValue={setCategory}
                  margin="0 5px 10px 5px"
                />

                {category != "transport" ? (
                  <>
                    <CustomInput
                      className="input"
                      title={subCategory}
                      label="????????????????????????"
                      url={`${URL}/category/real_estate/`}
                      setValue={setSubCategory}
                      margin="0 5px 10px 5px"
                      category={category}
                    />
                    <TextField
                      className="input"
                      required
                      onChange={(e) => setMinArea(e.target.value)}
                      label="???? 1 ????"
                      minRows="1"
                      maxRows="99"
                      type="number"
                      variant="outlined"
                      style={{
                        margin: "0 5px 10px 5px",
                      }}
                    />
                    <TextField
                      className="input"
                      required
                      onChange={(e) => setMaxArea(e.target.value)}
                      minRows="2"
                      maxRows="100"
                      label="???? 100 ????"
                      type="number"
                      variant="outlined"
                      style={{
                        margin: "0 5px 10px 5px",
                      }}
                    />
                    <TextField
                      className="input"
                      required
                      onChange={(e) => setMinPrice(e.target.value)}
                      label="???? 1 ??????"
                      type="number"
                      variant="outlined"
                      style={{
                        margin: "0 5px 10px 5px",
                      }}
                    />
                    <TextField
                      className="input"
                      required
                      onChange={(e) => setMaxPrice(e.target.value)}
                      label="???? 1 000 000 000 ??????"
                      type="number"
                      variant="outlined"
                      style={{
                        margin: "0 5px 10px 5px",
                      }}
                    />
                    <TextField
                      className="input"
                      required
                      onChange={(e) => setFloor(e.target.value)}
                      label="????????"
                      variant="outlined"
                      type="number"
                      style={{
                        margin: "0 5px 10px 5px",
                      }}
                    />
                    <TextField
                      className="input"
                      required
                      onChange={(e) => setRoom(e.target.value)}
                      label="??????????????"
                      type="number"
                      variant="outlined"
                      style={{
                        margin: "0 5px 10px 5px",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <CustomInput
                      className="input"
                      title={subCategory}
                      label="????????????????????????"
                      url={`${URL}/category/transport/`}
                      setValue={setSubCategory}
                      width="180px"
                      margin="0 5px 10px 5px"
                      category={category}
                    />
                    <TextField
                      className="input"
                      required
                      onChange={(e) => setMinPrice(e.target.value)}
                      label="???? 1 ??????"
                      type="number"
                      variant="outlined"
                      style={{
                        margin: "0 5px 10px 5px",
                      }}
                    />
                    <TextField
                      className="input"
                      required
                      onChange={(e) => setMaxPrice(e.target.value)}
                      label="???? 1 000 000 000 ??????"
                      type="number"
                      variant="outlined"
                      style={{
                        margin: "0 5px 10px 5px",
                      }}
                    />
                    <CustomInput
                      margin="0 5px 10px 5px"
                      className="input"
                      label="????????"
                      url={`${URL}/transport/color/`}
                      setValue={setColor}
                    />
                    <TextField
                      select
                      className="input"
                      label="?????? ??????????????"
                      required
                      value={fueltype}
                      onChange={(e) => setFueltype(e.target.value)}
                      style={{
                        margin: "0 5px 10px 5px",
                      }}
                    >
                      <MenuItem key={1} value="benzin">
                        ????????????
                      </MenuItem>
                      <MenuItem key={2} value="elektr">
                        ??????????????
                      </MenuItem>
                      <MenuItem key={3} value="dizel">
                        ??????????
                      </MenuItem>
                    </TextField>
                    <TextField
                      className="input"
                      select
                      label="?????????????? ??????????????"
                      required
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}
                      style={{
                        margin: "0 5px 10px 5px",
                      }}
                    >
                      <MenuItem key={1} value="mexanika">
                        ????????????????
                      </MenuItem>
                      <MenuItem key={2} value="avtomat">
                        ??????????????
                      </MenuItem>
                    </TextField>
                    <TextField
                      className="input"
                      type="number"
                      required
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      label="????????????"
                      variant="outlined"
                      style={{
                        margin: "0 5px 10px 5px",
                      }}
                    />
                  </>
                )}
              </div>
              <CustomSmpButton
                background="#53c4f7"
                color="#fff"
                border="none"
                padding="10px 10px"
                fontSize="16px"
                borderRadius="10px"
                margin="auto"
                height="48px"
                width="88px"
                iconBtn={<FaSearch />}
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="filter">
          <CustomSmpButton
            background="#9a78cb"
            color="#fff"
            border="none"
            padding="10px 10px"
            fontSize="16px"
            borderRadius="10px"
            margin="0 20px 10px auto"
            height="48px"
            width="100px"
            textBtn="????????????"
            funcBtn={() => setMobileFilter(!mobileFilter)}
          />
          {mobileFilter ? (
            <div className="filter-box">
              <form onSubmit={handleSubmit} className="filter-form">
                <div className="filter-flex">
                  <TextField
                    className="input"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="????????????????"
                    variant="outlined"
                    style={{
                      margin: "0 5px 10px 5px",
                    }}
                  />

                  <CustomInput
                    className="input"
                    label="??????????"
                    url={`${URL}/city/`}
                    setValue={setCity}
                    margin="0 5px 10px 5px"
                  />

                  <CustomInput
                    className="input"
                    title={category}
                    label="??????????????????"
                    url={`${URL}/category/`}
                    setValue={setCategory}
                    margin="0 5px 10px 5px"
                  />

                  {category != "transport" ? (
                    <>
                      <CustomInput
                        className="input"
                        title={subCategory}
                        label="????????????????????????"
                        url={`${URL}/category/real_estate/`}
                        setValue={setSubCategory}
                        margin="0 5px 10px 5px"
                        category={category}
                      />
                      <TextField
                        className="input"
                        required
                        onChange={(e) => setMinArea(e.target.value)}
                        label="???? 1 ????"
                        minRows="1"
                        maxRows="99"
                        type="number"
                        variant="outlined"
                        style={{
                          margin: "0 5px 10px 5px",
                        }}
                      />
                      <TextField
                        className="input"
                        required
                        onChange={(e) => setMaxArea(e.target.value)}
                        minRows="2"
                        maxRows="100"
                        label="???? 100 ????"
                        type="number"
                        variant="outlined"
                        style={{
                          margin: "0 5px 10px 5px",
                        }}
                      />
                      <TextField
                        className="input"
                        required
                        onChange={(e) => setMinPrice(e.target.value)}
                        label="???? 1 ??????"
                        type="number"
                        variant="outlined"
                        style={{
                          margin: "0 5px 10px 5px",
                        }}
                      />
                      <TextField
                        className="input"
                        required
                        onChange={(e) => setMaxPrice(e.target.value)}
                        label="???? 1 000 000 000 ??????"
                        type="number"
                        variant="outlined"
                        style={{
                          margin: "0 5px 10px 5px",
                        }}
                      />
                      <TextField
                        className="input"
                        required
                        onChange={(e) => setFloor(e.target.value)}
                        label="????????"
                        variant="outlined"
                        type="number"
                        style={{
                          margin: "0 5px 10px 5px",
                        }}
                      />
                      <TextField
                        className="input"
                        required
                        onChange={(e) => setRoom(e.target.value)}
                        label="??????????????"
                        type="number"
                        variant="outlined"
                        style={{
                          margin: "0 5px 10px 5px",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <CustomInput
                        className="input"
                        title={subCategory}
                        label="????????????????????????"
                        url={`${URL}/category/transport/`}
                        setValue={setSubCategory}
                        width="180px"
                        margin="0 5px 10px 5px"
                        category={category}
                      />
                      <TextField
                        className="input"
                        required
                        onChange={(e) => setMinPrice(e.target.value)}
                        label="???? 1 ??????"
                        type="number"
                        variant="outlined"
                        style={{
                          margin: "0 5px 10px 5px",
                        }}
                      />
                      <TextField
                        className="input"
                        required
                        onChange={(e) => setMaxPrice(e.target.value)}
                        label="???? 1 000 000 000 ??????"
                        type="number"
                        variant="outlined"
                        style={{
                          margin: "0 5px 10px 5px",
                        }}
                      />
                      <CustomInput
                        margin="0 5px 10px 5px"
                        className="input"
                        label="????????"
                        url={`${URL}/transport/color/`}
                        setValue={setColor}
                      />
                      <TextField
                        select
                        className="input"
                        label="?????? ??????????????"
                        required
                        value={fueltype}
                        onChange={(e) => setFueltype(e.target.value)}
                        style={{
                          margin: "0 5px 10px 5px",
                        }}
                      >
                        <MenuItem key={1} value="benzin">
                          ????????????
                        </MenuItem>
                        <MenuItem key={2} value="elektr">
                          ??????????????
                        </MenuItem>
                        <MenuItem key={3} value="dizel">
                          ??????????
                        </MenuItem>
                      </TextField>
                      <TextField
                        className="input"
                        select
                        label="?????????????? ??????????????"
                        required
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                        style={{
                          margin: "0 5px 10px 5px",
                        }}
                      >
                        <MenuItem key={1} value="mexanika">
                          ????????????????
                        </MenuItem>
                        <MenuItem key={2} value="avtomat">
                          ??????????????
                        </MenuItem>
                      </TextField>
                      <TextField
                        className="input"
                        type="number"
                        required
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        label="????????????"
                        variant="outlined"
                        style={{
                          margin: "0 5px 10px 5px",
                        }}
                      />
                    </>
                  )}
                </div>
                <CustomSmpButton
                  background="#53c4f7"
                  color="#fff"
                  border="none"
                  padding="10px 10px"
                  fontSize="16px"
                  borderRadius="10px"
                  margin="auto"
                  height="48px"
                  width="100%"
                  textBtn={"??????????"}
                />
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}

export default Filter;
