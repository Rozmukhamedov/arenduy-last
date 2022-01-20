import "./producttransport.css";
import ProductSlide from "../Product/ProductSlideComponent";
import ProductInformation from "../Product/ProductInformationComponent";
import PersonInformation from "../Product/PersonInformationComponent";
import ProductDescription from "../Product/ProductDescriptionComponent";
import ProductDetail from "../Product/ProductDetailsComponent";
import SliderOtherProducts from "../Product/ProductsSliderComponent";

function ProductTransport(products, subcategory, slug) {
  return (
    <div className="product-transport-grid">
      <ProductSlide />
      <ProductInformation response={products?.products} />
      <PersonInformation response={products?.products?.product?.author} />
      <ProductDescription response={products?.products?.product} />
      <ProductDetail response={products?.products} />
      <SliderOtherProducts
        response={products}
        subcategory={subcategory}
        slug={slug}
      ></SliderOtherProducts>
    </div>
  );
}
export default ProductTransport;
