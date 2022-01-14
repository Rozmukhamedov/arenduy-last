import "../../style/weather.css";
import { IMAGES, WEATHER_API_URL } from "../../constants/applicationConstants";
import _ from "lodash";
import { useEffect, useState } from "react";
import useCustomFetcher from "../../hooks/useCustomFetcher";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [weatherError, weatherIsLoading, weatherFetcher] = useCustomFetcher();

  useEffect(() => {
    weatherFetcher((data) => setWeather(data), `${WEATHER_API_URL}`, {});
  }, []);

  const precipitation = _.last(weather.weather);

  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const dataCard = new Date();

  const numDay = dataCard.getDay();
  const month = dataCard.getUTCMonth() + 1;
  const day = dataCard.getDate();
  const year = dataCard.getUTCFullYear();
  const hours = dataCard.getHours();

  const newdate = day + "/" + month + "/" + year;

  return (
    <>
      {weather != 0 ? (
        <div
          className={`${
            hours > 7 && hours < 17 ? "weather" : "weather night"
          } `}
        >
          <div className="weather-day">
            {hours > 7 && hours < 17 ? (
              <img className="icon-sun" src={IMAGES.IconSun} alt="icon-sun" />
            ) : (
              <img
                className="icon-moon"
                src={IMAGES.IconMoon}
                alt="icon-moon"
              />
            )}
          </div>
          <div key="i.id">
            {precipitation?.main == "Snow" ? (
              <img
                className="weather-precipitation"
                src={IMAGES.IconSnow}
                alt="icon-snow"
              /> ? (
                precipitation?.main == "Rain"
              ) : (
                <img
                  className="weather-precipitation"
                  src={IMAGES.IconRain}
                  alt="icon-snow"
                />
              )
            ) : (
              <img
                className="weather-precipitation"
                src={IMAGES.IconMist}
                alt="icon-snow"
              />
            )}
          </div>
          <div className="weather-detail">
            <h4 className="weather-temperature">
              {(weather.main?.temp - 273, 15)}&deg;
            </h4>
            <div>
              <p>{days[numDay]}</p>
              <p>{newdate}</p>
              <h6>Ташкент</h6>
            </div>
          </div>
        </div>
      ) : (
        <div className="weather">
          <div className="weather-day">
            <img src={IMAGES.IconSun} alt="icon-sun" />
          </div>
          <img
            className="weather-precipitation"
            src={IMAGES.IconMist}
            alt="icon-snow"
          />
          <div className="weather-detail">
            <h4 className="weather-temperature">11&deg;</h4>
            <div>
              <p>{days[numDay]}</p>
              <p>{newdate}</p>
              <h6>Ташкент</h6>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Weather;
