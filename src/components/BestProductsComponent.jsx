import { useEffect, useState } from "react";
import "../style/bestproducts.css";
import { URL } from "../constants/applicationConstants";
import useCustomFetcher from "../hooks/useCustomFetcher";
import Card from "./CardComponent";

function BestProducts() {
  const [products, setproducts] = useState([]);
  const [productsError, productsIsLoading, productsFetcher] =
    useCustomFetcher();

  useEffect(() => {
    productsFetcher(
      (data) => setproducts(data.results),
      `${URL}/search/all/?search=`,
      {}
    );
  }, []);

  return (
    <div className="best-products">
      <h2>Топовые Объявления</h2>
      <div className="products-flex">
        {products.map((product) => (
          <Card cardClass="slider-card" key={product.slug} response={product} />
        ))}
      </div>
    </div>
  );
}

export default BestProducts;
