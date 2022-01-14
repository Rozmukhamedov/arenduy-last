import Search from "../components/SearchComponent";
import Carousel from "../components/ui/CarouselComponent";
import Currencies from "../components/ui/CurrenciesComponent";
import Weather from "../components/ui/WeatherComponent";
import SliderComponent from "../components/SliderProductsComponent";
import BestProducts from "../components/BestProductsComponent";
import "../style/home.css";

function Home() {
  const Show = () => {};
  return (
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
  );
}

export default Home;
