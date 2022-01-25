import { useCallback, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const MapGoogle = ({ center }) => {
  const mapRef = useRef(undefined);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  );
};

export default MapGoogle;
