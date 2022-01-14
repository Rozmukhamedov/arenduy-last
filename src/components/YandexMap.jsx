import { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { IMAGES, URL } from "../constants/applicationConstants";
import useCustomFetcher from "../hooks/useCustomFetcher";
import Loader from "./ui/LoaderComponent";
import { split } from "lodash";
import { useNavigate } from "react-router-dom";

function YandexMap() {
  const [productsGeolocaitons, setProductsGeolocaitons] = useState([]);
  const [geolocation, setGeolocation] = useState();
  const [mapError, mapIsLoading, mapFetcher] = useCustomFetcher();
  console.log(productsGeolocaitons);

  const navigate = useNavigate();

  const link = (props) => {
    navigate(`${props.category.slug}/${props.subcategory}/${props.slug}`);
  };

  useEffect(() => {
    mapFetcher(
      (data) => {
        setProductsGeolocaitons(data);
      },
      `${URL}/map/toshkent/`,
      {}
    );
  }, []);

  if (mapIsLoading) return <Loader />;

  if (mapError) return <h1>Error</h1>;

  const result = () => {
    return <h1>Error</h1>;
  };

  return (
    <YMaps>
      <Map
        defaultState={{
          center: [55.684758, 37.738521],
          zoom: 9,
        }}
        width="100%"
        height="80vh"
      >
        {productsGeolocaitons.map((n) => (
          <div>
            {split(`${n?.location}`, ",", 2)}
            <Placemark
              onClick={() => link(n)}
              geometry={[55.684758, 37.738521]}
              options={{
                // iconLayout: "default#images",
                iconImageHref:
                  "https://static.tildacdn.com/tild3061-3235-4537-b066-616662373363/Group_783.svg",
                iconImageSize: [130, 130],
                iconImageOffset: [-65, -110],
              }}
            />
          </div>
        ))}
      </Map>
    </YMaps>
  );
}

export default YandexMap;
