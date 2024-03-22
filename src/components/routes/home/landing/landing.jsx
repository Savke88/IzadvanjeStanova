import React from "react";
import { useNavigate } from "react-router-dom";
import stan1 from "../../../../slike/slike-landing/stan1.jpg";
import stan2 from "../../../../slike/slike-landing/stan2.jpg";
import CarouselComponent from "../../../../carousel-component/carousel";
import "./landing.scss";
import UtisakKorisnika from "./utisak-korisnika/utisak.korisnika";
import MisljenjeKorisnika from "./utisak-korisnika/misljenje-korisnika";
import Opstine from "./opstine/opstine";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="landing-container izdavanje">
        <div className="image-section">
          <img src={stan1} alt="stan1" />
        </div>
        <div className="text-section">
          <h1>Za vlasnike</h1>
          <p>Brzo i sigurno izdajte svoju nekretninu</p>
          <p>
            Uštedite svoje vreme i uz najnižu proviziju na tržištu lako izdajte
            svoju nekretninu. Popunite formular sa sajta ili nas pozovite i naš
            tim će slikati nekretninu, napraviti prezentaciju čime će vaš stan,
            kuća ili poslovni prostor biti dostupan hiljadama zakupaca koji
            svakodnevno traže nekretnine na našem sajtu.
          </p>
          <ul>
            <li>Besplatna procena vrednosti nekretnine</li>
            <li>
              Iskusni agenti na raspolaganju tokom celog procesa kupoprodaje
            </li>
            <li>
              Prikupljanje dokumentacije za sastavljanje ugovora i pravna
              podrška
            </li>
          </ul>
          <button onClick={() => navigate('/izdaj')}>Izdaj</button>
        </div>
      </div>

      <div className="landing-container zakupci">
        <div className="text-section">
          <h1>Za zakupce</h1>
          <p>Pronadjite i iznajmite nekretninu po vašoj želji</p>
          <p>
            Nemate dovoljno vremena da pronađete idealan stan za život? I taman
            kada pomislite da ste ga pronašli, uživo uopšte ne izgleda kao na
            slikama. Znamo kako se osećate! Zato je nastao KiM rental i pravo
            je vreme da zaboravite na ove neprijatne trenutke. Nema više
            iznenađenja jer ćete uz naš inovativan prikaz nekretnine imati
            potpuni uvid u sve što vam je važno.
          </p>
          <div className="dugme">
          <button onClick={() => navigate('/nekretnine')}>Iznajmi</button>
          </div>
        </div>
        <div className="image-section">
          <img src={stan2} alt="stan2" />
        </div>
      </div>
      <div className="carousel-slider">
        <h1>Najpopularniji izbor</h1>
        <CarouselComponent />
      </div>
      <UtisakKorisnika />
      <MisljenjeKorisnika />
      <Opstine />
    </div>
  );
};

export default Landing;
