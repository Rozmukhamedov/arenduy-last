import "./productrealestate.css";
import ProductSlide from "../Product/ProductSlideComponent";
import ProductInformation from "../Product/ProductInformationComponent";
import PersonInformation from "../Product/PersonInformationComponent";
import ProductMap from "../Product/ProductMapComponent";
import ProductDescription from "../Product/ProductDescriptionComponent";
import ProductDetail from "../Product/ProductDetailsComponent";

function ProductRealEstate(products) {
  console.log(products);
  return (
    <div className="product-grid">
      <ProductSlide />
      <ProductInformation response={products?.products} />
      <PersonInformation response={products?.products?.product?.author} />
      <ProductMap response={products?.products} />
      <ProductDescription response={products?.products?.product} />
      <ProductDetail response={products?.products} />
    </div>
  );
}
export default ProductRealEstate;
