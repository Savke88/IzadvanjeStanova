// CarouselPrikazSlika.js

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel-prikaz-slika.scss';

const CarouselPrikazSlika = ({ slike, onRemove }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev-arrow`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  return (
    <Slider  className="unos-slika"{...settings}>
      {slike.map((slika, index) => (
        <div key={slika.name} className="carousel-slika">
          <div className="image-number">{index + 1}</div>
          <img src={slika.prikaz} alt={`Prikaz ${index + 1}`} />
          <button 
            className="ukloni-sliku-dugme" 
            onClick={() => onRemove(slika.name)}
          >
            X
          </button>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselPrikazSlika;
