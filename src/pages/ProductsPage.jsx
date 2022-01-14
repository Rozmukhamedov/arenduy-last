import "../style/products.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { URL } from "../constants/applicationConstants";
import Loader from "../components/ui/LoaderComponent";
import Card from "../components/CardComponent";
import NoProducts from "../components/Text/NoProductsComponent";
import Error from "../components/Text/NotFoundComponent";
import Filter from "../components/FilterComponent";

function PrdouctsPage() {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);

  const [productsError, productsIsLoading, productsFetcher] =
    useCustomFetcher();

  useEffect(() => {
    productsFetcher(
      (data) => setProducts(data),
      `${URL}/product/list/${category}/${subcategory}/`,
      {}
    );
  }, [category, subcategory]);

  if (productsIsLoading) return <Loader />;

  if (productsError) return <Error />;

  return (
    <div className="products-page">
      <Filter urlCategory={category} urlSubcategory={subcategory} />

      <h2>Объявления</h2>
      <div className="cards-grid">
        {products?.results?.length != 0 ? (
          products?.results?.map((product) => (
            <Card
              key={product.slug}
              response={product}
              category={category}
              subcategory={subcategory}
            />
          ))
        ) : (
          <NoProducts />
        )}
      </div>
    </div>
  );
}

export default PrdouctsPage;
