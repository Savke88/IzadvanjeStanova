// FilterPretrage.jsx
import React, { useState } from 'react';
import './filter-pretrage.scss';
import LokacijeOpstina from '../home/landing/opstine/lokacije-opstina';

const FilterPretrage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    tipImovine: "",
    tip: "",
    opstina: "",
    lokacija: "",
    cenaOd: "",
    cenaDo: "",
    kvadraturaOd: "",
    kvadraturaDo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <select className='polje-pretrage' 
        name="tipImovine"
        onChange={handleChange}
        value={formData.tipImovine}
      >
        <option value="" disabled>Tip Imovine</option>
        <option value="Izdavanje">Izdavanje</option>
        <option value="Prodavanje">Prodavanje</option>
      </select>
      <select className='polje-pretrage'
        name="tip"
        onChange={handleChange}
        value={formData.tip}
      >
        <option value="" disabled>Tip objekta</option>
        <option value="Stan">Stan</option>
        <option value="Kuća">Kuća</option>
        <option value="Lokal">Lokal</option>
        <option value="Kancelarija">Kancelarija</option>
      </select>
      <select className='polje-pretrage'
        name="opstina"
        onChange={handleChange}
        value={formData.opstina}
      >
        <option value="" disabled>Opština</option>
        {LokacijeOpstina.map(opstina => (
          <option key={opstina.ime} value={opstina.ime}>{opstina.ime}</option>
        ))}
      </select>
      <select className='polje-pretrage'
        name="lokacija"
        onChange={handleChange}
        value={formData.lokacija}
        disabled={!formData.opstina}
      >
        <option value="" disabled>Lokacija</option>
        {LokacijeOpstina.find(opstina => opstina.ime === formData.opstina)?.lokacija.map(lokacija => (
          <option key={lokacija} value={lokacija}>{lokacija}</option>
        ))}
      </select>
      <input className='polje-pretrage'
        name="cenaOd"
        placeholder="Cena od(€)"
        type="number"
        value={formData.cenaOd}
        onChange={handleChange}
      />
      <input className='polje-pretrage'
        name="cenaDo"
        placeholder="Cena do(€)"
        type="number"
        value={formData.cenaDo}
        onChange={handleChange}
      />
      <input className='polje-pretrage'
        name="kvadraturaOd"
        placeholder="m² od"
        type="number"
        value={formData.kvadraturaOd}
        onChange={handleChange}
      />
      <input className='polje-pretrage'
        name="kvadraturaDo"
        placeholder="m² do"
        type="number"
        value={formData.kvadraturaDo}
        onChange={handleChange}
      />
      <button type="submit">Pretraži</button>
    </form>
  );
};

export default FilterPretrage;
