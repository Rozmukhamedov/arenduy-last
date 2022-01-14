import "../style/product.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../constants/applicationConstants";
import Loader from "../components/ui/LoaderComponent";
import NotFoundComponent from "../components/Text/NotFoundComponent";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { useCookies } from "react-cookie";
import ProductRealEstate from "../components/ProductCategory/ProductRealEstate";

function ProductPage() {
  const { slug, category, subcategory } = useParams();
  const [products, setProducts] = useState([]);

  const [cookies] = useCookies(["tokens"]);

  const [accessToken, setAccessToken] = useState(cookies?.tokens?.access);

  const [productsError, productsIsLoading, productsFetcher] =
    useCustomFetcher();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }),
    };

    if (accessToken != null) {
      productsFetcher(
        (data) => {
          setProducts(data);
        },
        `${URL}/${category}/${subcategory}/detail/${slug}/`,
        requestOptions
      );
    } else {
      productsFetcher(
        (data) => {
          setProducts(data);
        },
        `${URL}/${category}/${subcategory}/detail/${slug}/`,
        {}
      );
    }
  }, [slug, category, subcategory]);

  if (productsIsLoading) return <Loader />;

  if (productsError) return <NotFoundComponent />;

  return (
    <>
      <ProductRealEstate products={products}></ProductRealEstate>
    </>
  );
}
export default ProductPage;
