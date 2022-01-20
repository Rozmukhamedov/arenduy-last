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

  function locM(props) {
    const locM = split(`${props?.location}`, ",", 2);
    console.log(locM[0]);
    return locM[0];
  }

  function locN(props) {
    const locN = split(`${props?.location}`, ",", 2);
    console.log(locN[1]);
    return locN[1];
  }

  if (mapIsLoading) return <Loader />;

  if (mapError) return <h1>Error</h1>;

  const result = () => {
    return <h1>Error</h1>;
  };

  return (
    <YMaps>
      <Map
        defaultState={{
          center: [41.2994958, 69.2400734],
          zoom: 9,
        }}
        width="100%"
        height="80vh"
      >
        {productsGeolocaitons.map((n) => (
          <div key={n.key}>
            <Placemark
              onClick={() => link(n)}
              geometry={[locM(n), locN(n)]}
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
