import { useState, useEffect } from 'react'

function useGeoLocation() {
    const [location, setLocation] = useState({
        loadad: false,
        lat: "",
        lng: "",
    });

    const onSuccuss = location => {
        setLocation({
            loaded: true,
            lat: location.coords.latitude,
            lng: location.coords.longitude

        })
    }

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        })
    }

    useEffect(() => {
        if (!("geolaction" in navigator)) {
            onError({
                code: 0,
                message: "Геолокация не найдено",
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccuss, onError)
    }, []);

    return location;
}


export default useGeoLocation;