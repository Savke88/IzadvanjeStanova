import React from 'react';
import Slider from "react-slick"; 
import musko from '../../../../../slike/slike-pocetne-stranice/musko.png';
import zensko from '../../../../../slike/slike-pocetne-stranice/zensko.png';
import './misljenje-korisnika.scss'
const MisljenjeKorisnika = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };


  const izjave = [
    { 
      id: 1, 
      name: "Marko", 
      image: musko, 
      text: "Odlična aplikacija, veoma korisna i jednostavna za upotrebu. Našao sam idealan stan u centru grada za manje od nedelje dana!" 
    },
    { 
      id: 2, 
      name: "Jelena", 
      image: zensko, 
      text: "Najbolja usluga ikada. Brzo i lako sam pronašla stan. Detaljni opisi i slike nekretnina su mi olakšali izbor." 
    },
    { 
      id: 3, 
      name: "Ivan", 
      image: musko, 
      text: "Impresioniran sam efikasnošću servisa. Komunikacija sa vlasnicima je bila direktna i bez komplikacija." 
    },
    { 
      id: 4, 
      name: "Ana", 
      image: zensko, 
      text: "Preporučujem svima! Veliki broj opcija i jednostavna navigacija kroz aplikaciju su mi pomogli da brzo pronađem idealan prostor za život." 
    },
    { 
      id: 5, 
      name: "Nikola", 
      image: musko, 
      text: "Nakon nekoliko neuspešnih poseta drugim stanovima, preko ove aplikacije sam našao savršen stan bez skrivenih troškova." 
    },
    { 
      id: 6, 
      name: "Marija", 
      image: zensko, 
      text: "Fantastično iskustvo! Lako sam uporedila cene i uslove iznajmljivanja i pronašla stan koji odgovara mojim potrebama." 
    }
  ];
  

  return (
    <div className='misljenje-korisnika'>
      <h1>Šta drugi kažu o nama</h1>
      <h2>Iskustva drugih su nam jako bitna da bi ste i vi mogli da imate poverenje u nas</h2>

      <Slider className='strelice'{...settings}>
        {izjave.map((izjava) => (
          <div key={izjava.id} className="izjava">
            <img src={izjava.image} alt={`Slika korisnika ${izjava.name}`} className="slika-korisnika" />
            <p>{izjava.text}</p>
            <h4>{izjava.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
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

export default MisljenjeKorisnika;
