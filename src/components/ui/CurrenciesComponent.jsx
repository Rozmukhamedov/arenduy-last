import "../../style/currencies.css";
import {
  IMAGES,
  CURRENCIES_API_URL,
} from "../../constants/applicationConstants";
import useCustomFetcher from "../../hooks/useCustomFetcher";
import { useState } from "react";
import { useEffect } from "react";

function Currencies() {
  const [currencies, setCurrencies] = useState([]);
  const [currenciesError, currenciesIsLoading, currenciesFetcher] =
    useCustomFetcher();

  useEffect(() => {
    currenciesFetcher(
      (data) => setCurrencies(data),
      `${CURRENCIES_API_URL}`,
      {}
    );
  }, []);

  return (
    <>
      {currencies.lenght != 0 ? (
        <div className="currencies">
          <img
            className="currencies-img"
            src={IMAGES.imgUsaFlag}
            alt="usa-flag-for-currencies"
          />
          <h5 className="currencies-code">{currencies[23]?.code}</h5>
          <p className="currencies-price">{currencies[23]?.cb_price}</p>
        </div>
      ) : (
        <div className="currencies">
          <img
            className="currencies-img"
            src={IMAGES.imgUsaFlag}
            alt="usa-flag-for-currencies"
          />
          <h5 className="currencies-code">USD</h5>
          <p className="currencies-price">10837.00</p>
        </div>
      )}
    </>
  );
}

export default Currencies;
