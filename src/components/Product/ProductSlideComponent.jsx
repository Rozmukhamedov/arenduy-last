import Slider from "react-slick";
import { CAROUSEL_IMAGES } from "../../constants/applicationConstants";
import "../../style/productslide.css";

export default function ProductSlide() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="product-slide">
      <Slider {...settings}>
        {CAROUSEL_IMAGES?.images?.map((image) => (
          <img key={image.id} src={image.imgPath} alt={image.name} />
        ))}
      </Slider>
    </div>
  );
}
