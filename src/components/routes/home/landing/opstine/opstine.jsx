import React from "react";
import PodaciOpstina from "./podaci-opstina";
import './opstine.scss'

const Opstine = () => {
  return (
    <div className="opstine">
      {PodaciOpstina.map(opstina => (
        <div key={opstina.name} className="opstina">
          <img src={opstina.image} alt={opstina.name} />
          <h2>{opstina.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Opstine;