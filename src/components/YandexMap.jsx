import { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { IMAGES, URL } from "../constants/applicationConstants";
import useCustomFetcher from "../hooks/useCustomFetcher";
import Loader from "./ui/LoaderComponent";
import { split } from "lodash";
import { useNavigate } from "react-router-dom";
import IconMapYan from "../images/iconMap.png";
import Navbar from "./Layout/HeaderComponent";

function YandexMap() {
  const [productsGeolocaitons, setProductsGeolocaitons] = useState([]);

  const [mapError, mapIsLoading, mapFetcher] = useCustomFetcher();

  const navigate = useNavigate();

  const link = (props) => {
    navigate(`real_estate/${props.subcategory}/${props.slug}`);
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
    return locM[0];
  }

  function locN(props) {
    const locN = split(`${props?.location}`, ",", 2);
    return locN[1];
  }

  if (mapError) return <h1>Error</h1>;

  return (
    <>
      <Navbar />
      <YMaps>
        <Map
          defaultState={{
            center: [41.2994958, 69.2400734],
            zoom: 9,
          }}
          width="100%"
          height="100vh"
        >
          {productsGeolocaitons.map((n, i) => (
            <div key={i}>
              <Placemark
                onClick={() => link(n)}
                geometry={[locM(n), locN(n)]}
                options={{
                  // iconLayout: "default#images",
                  iconImageHref: `${IconMapYan}`,
                  iconImageSize: [130, 130],
                  iconImageOffset: [-65, -110],
                }}
              />
            </div>
          ))}
        </Map>
      </YMaps>
    </>
  );
}

export default YandexMap;
