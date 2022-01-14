import "../../style/productdescription.css";

export default function ProductDescription({ response }) {
  return (
    <div className="product-description">
      <h1>Описание</h1>
      <p>{response?.description}</p>
    </div>
  );
}
