import "../../style/productadditionally.css";

export default function ProductAdditionally({ response }) {
  return (
    <div className="Product-additionally">
      <h1>Дополнительное</h1>
      <div className="product-table">
        <div className="column-left">
          <p>Площадь</p>
          <p>Этаж</p>
          <p>Комната</p>
        </div>
        <div className="column-right">
          <p>{response?.total_area}</p>
          <p>{response?.rooms}</p>
          <p>{response?.floor}</p>
        </div>
      </div>
    </div>
  );
}
