import "./producttransport.css";
import ProductSlide from "../Product/ProductSlideComponent";
import ProductInformation from "../Product/ProductInformationComponent";
import PersonInformation from "../Product/PersonInformationComponent";
import ProductMap from "../Product/ProductMapComponent";
import ProductDescription from "../Product/ProductDescriptionComponent";
import ProductDetail from "../Product/ProductDetailsComponent";

function ProductTransport(products) {
  return (
    <div className="product-transport-grid">
      <ProductSlide />
      <ProductInformation response={products?.products} />
      <PersonInformation response={products?.products?.product?.author} />
      <ProductDescription response={products?.products?.product} />
      <ProductDetail response={products?.products} />
    </div>
  );
}
export default ProductTransport;
