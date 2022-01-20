import Slider from "react-slick";
import "../../style/carousel.css";
import { CAROUSEL_IMAGES } from "../../constants/applicationConstants";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dotsClass: "button-bar",
    arrows: false,
  };

  return (
    <div className="carousel">
      <h2> Что нового</h2>
      <Slider {...settings}>
        {CAROUSEL_IMAGES?.images?.map((image) => (
          <img src={image.imgPath} alt={image.name} key={image.name} />
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
