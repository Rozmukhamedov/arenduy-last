import { useCookies } from "react-cookie";
import useCustomFetcher from "../../hooks/useCustomFetcher";
import Loader from "../ui/LoaderComponent";
import "../../style/myproduct.css";
import { URL } from "../../constants/applicationConstants";
import Card from "../CardComponent";
import Error from "../Text/NotFoundComponent";
import NoProducts from "../Text/NoProductsComponent";
import { remove, size } from "lodash";
import { useEffect, useState } from "react";

function MyProducts() {
  const [cookies] = useCookies(["tokens"]);
  const accessToken = cookies.tokens.access;
  const [products, setProducts] = useState([]);
  const [productsError, productsIsLoading, productsFetcher] =
    useCustomFetcher();

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  useEffect(() => {
    productsFetcher(
      (data) => setProducts(data.results),
      `${URL}/my/`,
      requestOptions
    );
  }, []);

  const removeProduct = (slug) => {
    alert(slug);
    const requestOptionsDelete = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    productsFetcher(
      () => {
        const updatedProducts = [...products].filter(
          (product) => product.slug !== slug
        );
        setProducts(products);
      },
      `${URL}/product/delete/${slug}`,
      requestOptionsDelete
    );
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
              functBtn={removeProduct}
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
