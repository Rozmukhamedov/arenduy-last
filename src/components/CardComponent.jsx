import "../style/card.css";
import { IMAGES, URL } from "../constants/applicationConstants";
import { FaMapMarkerAlt, FaRegHeart, FaTrash, FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomSmpButton from "./CustomSmpButton";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { useAlert } from "react-alert";

function Card({ response, category, funcBtn, cardClass, removeProduct }) {
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert();

  const [isFavourite, setIsFavourite] = useState(false);

  const [cookies] = useCookies(["tokens"]);
  const accessToken = cookies?.tokens?.access;

  const [productsError, productsIsLoading, productsFetcher] =
    useCustomFetcher();

  const addFavourite = (slug) => {
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }),
      body: JSON.stringify({
        slug: slug,
      }),
    };

    if (cookies?.tokens != undefined) {
      productsFetcher(() => {}, `${URL}/favorite/`, requestOptions);
      setIsFavourite(!isFavourite);
      alert.show("Добавлен в избраннное");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={`card-box ${cardClass}`}>
      <div
        className="card-img"
        style={{
          width: "100%",
          height: "260px",
          backgroundImage: `url(${IMAGES.imgCard})`,
          backgroundRepeat: "no-repeat",
          borderRadius: "30px",
          backgroundPosition: "center center",
          backgroundSize: "100% 260px",
          marginBottom: "5px",
        }}
      >
        <div className="btn">
          {location.pathname == "/favourite" ? (
            <CustomSmpButton
              fontSize="30px"
              background="none"
              zIndex="1"
              border="none"
              color="red"
              funcBtn={() => funcBtn(response?.slug)}
              iconBtn={<FaTrash />}
            />
          ) : location.pathname == "/profile/myproducts" ? (
            <CustomSmpButton
              fontSize="30px"
              background="none"
              zIndex="1"
              border="none"
              color="red"
              funcBtn={() => removeProduct(response?.slug)}
              iconBtn={<FaTrash />}
            />
          ) : (
            <CustomSmpButton
              color="#9a78cb"
              background="none"
              fontSize="30px"
              border="none"
              height="40px"
              funcBtn={() => addFavourite(response?.slug)}
              iconBtn={isFavourite ? <FaHeart /> : <FaRegHeart />}
            />
          )}
        </div>
      </div>

      <div className="card-info">
        <div className="card-title">
          <h6>{response?.title}</h6>
          <p className="card-city">
            <FaMapMarkerAlt className="fa" /> {response?.city}
          </p>
        </div>
        <Link to={`/${category}/${response?.subcategory}/${response?.slug}`}>
          <CustomSmpButton
            btnClassName={"cardBtn"}
            textBtn={`${response.price} сум`}
            background="#58b7fd"
            color="#fff"
            border="none"
            padding="10px 10px"
            fontSize="16px"
            borderRadius="10px"
            width="110px"
            minHeight="54px"
            height="40px"
          />
        </Link>
      </div>
    </div>
  );
}

export default Card;
