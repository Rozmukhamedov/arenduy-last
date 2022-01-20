import { useCookies } from "react-cookie";
import useCustomFetcher from "../../hooks/useCustomFetcher";
import Loader from "../ui/LoaderComponent";
import "../../style/myproduct.css";
import { URL } from "../../constants/applicationConstants";
import Card from "../CardComponent";
import Error from "../Text/NotFoundComponent";
import NoProducts from "../Text/NoProductsComponent";
import { size } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyProducts() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["tokens"]);
  const accessToken = cookies.tokens.access;

  const [products, setProducts] = useState([]);
  const [productsError, productsIsLoading, productsFetcher] =
    useCustomFetcher();

  const requestOptions = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
    }),
  };

  useEffect(() => {
    productsFetcher(
      (data) => setProducts(data.results),
      `${URL}/my/`,
      requestOptions
    );
  }, []);

  const removeProduct = (slug) => {
    const requestOptionsDelete = {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    };

    productsFetcher(
      () => {
        const updatedProducts = [...products].filter(
          (product) => product.slug !== slug
        );
        setProducts(updatedProducts);
      },
      `${URL}/product/delete/${slug}`,
      requestOptionsDelete
    );
    navigate("/");
  };

  if (productsIsLoading) return <Loader />;

  if (productsError) return <Error />;

  return (
    <div className="my-products">
      <div className="cards-grid">
        {size(products) != 0 ? (
          products.map((p) => (
            <Card
              cardClass="products-card"
              key={p.slug}
              response={p}
              removeProduct={removeProduct}
            />
          ))
        ) : (
          <NoProducts />
        )}
      </div>
    </div>
  );
}

export default MyProducts;
