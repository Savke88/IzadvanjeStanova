import React from "react";
import Slider from "react-slick";
import stambeniObjekti from "./stambeni-objekti";
import './carousel.scss'

import './carousel.scss'
const CarouselComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }


  return (
    <Slider className="strelice" {...settings}>
      {stambeniObjekti.map((objekt, index) => (
        <div key={index} className="carousel-item">
          <img src={objekt.slika} alt={objekt.ime} />
          <h3>{objekt.ime}</h3>
          <p>{`${objekt.cena} €`}</p>
          <p>{`${objekt.povrsina}`}</p>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselComponent;