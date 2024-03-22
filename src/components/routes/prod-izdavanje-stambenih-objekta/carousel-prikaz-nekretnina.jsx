
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel-prikaz-nekretina.scss'

const CarouselPrikazNekretnina= ({ slike }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
          slidesToShow: 1,
          slidesToScroll: 1
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} strelica-desno`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} strelica-levo`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  

  return (
    <Slider className="prikaz-nekretnina" {...settings}>
      {slike.map((imageURL, index) => (
        <div key={index} className="carousel-slika">
          <img src={imageURL} alt={`Slika ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

export default CarouselPrikazNekretnina;
