import Search from "../components/SearchComponent";
import Carousel from "../components/ui/CarouselComponent";
import Currencies from "../components/ui/CurrenciesComponent";
import Weather from "../components/ui/WeatherComponent";
import SliderComponent from "../components/SliderProductsComponent";
import BestProducts from "../components/BestProductsComponent";
import "../style/home.css";
import { useState, useEffect } from "react";
import LogoLoader from "../images/arenduy2.mov";

function Home() {
  const [loaderLogo, setLoaderLogo] = useState(false);
  const Show = () => {};

  useEffect(() => {
    setTimeout(() => setLoaderLogo(true), 2400);
  }, []);

  return (
    <>
      {loaderLogo ? (
        <>
          <Search classForm={"mobile-search"} Show={Show} />
          <div className="main-grid">
            <Currencies />
            <Weather />
            <Carousel />
            <SliderComponent />
            <BestProducts />
          </div>
        </>
      ) : (
        <img id="img1" src={LogoLoader} />
      )}
    </>
  );
}

export default Home;
