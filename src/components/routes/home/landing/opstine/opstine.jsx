import React from "react";
import PodaciOpstina from "./podaci-opstina";
import './opstine.scss';
import { useNavigate } from "react-router-dom";

const Opstine = () => {
  const navigate = useNavigate();

  const handleClick = (opstina) => {
    navigate('/nekretnine', { state: { opstina } });
  };

  return (
    <div className="opstine">
      {PodaciOpstina.map(opstina => (
        <div key={opstina.name} className="opstina" onClick={() => handleClick(opstina.name)}>
          <img src={opstina.image} alt={opstina.name} />
          <h2>{opstina.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Opstine;