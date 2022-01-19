import { useEffect, useState } from "react";
import "../../style/otherslider.css";
import Slider from "react-slick";
import { URL } from "../../constants/applicationConstants";
import useCustomFetcher from "../../hooks/useCustomFetcher";
import Card from "../CardComponent";

function SliderOtherProducts({ subcategory, slug }) {
  const [products, setproducts] = useState([]);
  const [productsError, productsIsLoading, productsFetcher] =
    useCustomFetcher();

  useEffect(() => {
    productsFetcher(
      (data) => console.log(data.results),
      `${URL}/similar/${subcategory}/${slug}`,
      {}
    );
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1130,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-other-products">
      <h2>Похожие Объявления</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <Card
            cardClass="slider-card-products"
            key={product.slug}
            response={product}
          />
        ))}
      </Slider>
    </div>
  );
}

export default SliderOtherProducts;
