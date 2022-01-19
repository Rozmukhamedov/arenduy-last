import "../../style/productmap.css";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import { split } from "lodash";

export default function ProductMap({ response }) {
  const array = split(`${response?.product?.location}`, ",", 2);

  return (
    <div className="product-map">
      <YMaps>
        <Map
          width="100%"
          height="330px"
          defaultState={{
            center: [array[0], array[1]],
            zoom: 9,
          }}
        >
          <Placemark geometry={[array[0], array[1]]} />
        </Map>
      </YMaps>
    </div>
  );
}
