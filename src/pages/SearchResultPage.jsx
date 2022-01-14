import { useParams, useLocation, useSearchParams } from "react-router-dom";
import Filter from "../components/FilterComponent";
import "../style/searchresult.css";
import Card from "../components/CardComponent";
import Loader from "../components/ui/LoaderComponent";
import NoProducts from "../components/Text/NoProductsComponent";
import { useEffect, useState } from "react";
import Error from "../components/Text/NotFoundComponent";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { SEARCH_PARAM_NAMES, URL } from "../constants/applicationConstants";

function SearchResultPage() {
  let location = useLocation();
  const { category } = useParams();

  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [productsError, productsIsLoading, productsFetcher] =
    useCustomFetcher();

  useEffect(() => {
    productsFetcher(
      (data) => setProducts(data),
      `${URL}/${location.state}`,
      {}
    );
  }, [searchParams]);

  if (productsIsLoading) return <Loader />;

  if (productsError) return <Error />;

  return (
    <div className="search-result">
      <Filter />
      <h2>Объявления</h2>
      <div className="cards-grid">
        {products.lenght != 0 ? (
          products.map((product) => (
            <div key={product.slug}>
              <Card response={product} category={category} />
            </div>
          ))
        ) : (
          <NoProducts />
        )}
      </div>
    </div>
  );
}

export default SearchResultPage;
