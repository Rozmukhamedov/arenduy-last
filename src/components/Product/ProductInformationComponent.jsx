import { useState } from "react";
import { useCookies } from "react-cookie";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constants/applicationConstants";
import useCustomFetcher from "../../hooks/useCustomFetcher";
import "../../style/productinformation.css";
import CustomSmpButton from "../CustomSmpButton";

export default function ProductInformation({ response }) {
  const [favourite, setFavourite] = useState(
    response.is_favourite == true ? false : true
  );

  const [cookies] = useCookies(["tokens"]);

  const navigate = useNavigate();

  const [productsError, productsIsLoading, productsFetcher] =
    useCustomFetcher();

  const addFavourite = (slug) => {
    setFavourite(false);
    if (cookies?.tokens?.access != undefined) {
      const requestOptions = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.tokens?.access}`,
        }),
        body: JSON.stringify({
          slug: slug,
        }),
      };

      productsFetcher(
        (res) => {
          console.log(res);
        },
        `${URL}/favorite/`,
        requestOptions
      );
    } else {
      navigate("/login");
    }
  };

  // const removeFavourite = (slug) => {
  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     }),
  //     body: JSON.stringify({
  //       slug: slug,
  //     }),
  //   };

  //   productsFetcher(
  //     (res) => {
  //       res?.code == "token_not_valid"
  //         ? navigate("/login")
  //         : setFavourite(!favourite);
  //     },
  //     `${URL}/favorite/`,
  //     requestOptions
  //   );
  // };

  return (
    <div className="product-information product-flex">
      <div className="product-text">
        <p>{response?.product?.created}</p>
        <h1>{response?.product?.title}</h1>
        <h4>{response?.product?.price} / ??????</h4>
      </div>

      <CustomSmpButton
        color="#9a78cb"
        background="none"
        fontSize="30px"
        border="none"
        width={"40px"}
        height={"40px"}
        disabled={false}
        iconBtn={favourite == false ? <FaHeart /> : <FaRegHeart />}
        funcBtn={() => addFavourite(response?.product?.slug)}
      />

      {/* {favourite == true ? (
        <CustomSmpButton
          color="#9a78cb"
          background="none"
          fontSize="30px"
          border="none"
          width={"40px"}
          height={"40px"}
          disabled={false}
          iconBtn={<FaRegHeart />}
          funcBtn={() => removeFavourite(response?.slug)}
        />
      ) : (
        <CustomSmpButton
          color="#9a78cb"
          background="none"
          fontSize="30px"
          border="none"
          width={"40px"}
          height={"40px"}
          disabled={false}
          iconBtn={<FaHeart />}
          funcBtn={() => addFavourite(response?.slug)}
        />
      )} */}
    </div>
  );
}
