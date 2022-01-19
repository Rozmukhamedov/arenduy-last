import { useCookies } from "react-cookie";
import Loader from "../components/ui/LoaderComponent";
import "../style/favourite.css";
import Card from "../components/CardComponent";
import { URL } from "../constants/applicationConstants";
import NoProducts from "../components/Text/NoProductsComponent";
import { useEffect, useState } from "react";
import useCustomFetcher from "../hooks/useCustomFetcher";
import Error from "../components/Text/NotFoundComponent";
import { remove } from "lodash";
import { useNavigate } from "react-router-dom";

function FavouritePage() {
  const [products, setProducts] = useState([]);
  const [cookies] = useCookies(["tokens"]);
  const accessToken = cookies?.tokens?.access;
  const navigate = useNavigate();

  const requestOptions = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
    }),
  };

  const [productsError, productsIsLoading, productsFetcher] =
    useCustomFetcher();

  useEffect(() => {
    productsFetcher(
      (data) => setProducts(data),
      `${URL}/favorite/`,
      requestOptions
    );
  }, []);

  const removeFavourite = (slug) => {
    const requestOptionsRemove = {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }),
      body: JSON.stringify({
        slug: slug,
      }),
    };

    productsFetcher(
      () => {
        const copiedProducts = [...products];
        remove(copiedProducts, (product) => product.slug === slug);
        setProducts(copiedProducts);
      },
      `${URL}/favorite/`,
      requestOptionsRemove
    );
    navigate("/favourite");
  };

  if (productsIsLoading) return <Loader />;

  if (productsError) return <Error />;

  return (
    <>
      <h1>Избранное</h1>
      <div className="cards-grid">
        {products.length != 0 ? (
          products.map((product) => (
            <Card
              response={product}
              key={product.slug}
              funcBtn={removeFavourite}
            />
          ))
        ) : (
          <NoProducts />
        )}
      </div>
    </>
  );
}

export default FavouritePage;
