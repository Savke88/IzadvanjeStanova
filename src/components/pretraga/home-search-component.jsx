import React, { useState } from 'react';
import './home-search-component.scss';
import { useNavigate } from 'react-router-dom';
import LokacijeOpstina from '../routes/home/landing/opstine/lokacije-opstina';

function SearchComponent() {
  const [opstina, setOpstina] = useState('');
  const [tip, setTip] = useState('');
  const [cenaOd, setCenaOd] = useState('');
  const [cenaDo, setCenaDo] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'opstina':
        setOpstina(value);
        break;
      case 'tip':
        setTip(value);
        break;
      case 'cenaOd':
        setCenaOd(value);
        break;
      case 'cenaDo':
        setCenaDo(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/nekretnine', { state: { opstina, tip, cenaOd, cenaDo } });
  };

  return (
    <form className='forma' onSubmit={handleSubmit}>
      <div>
        <label>Opština:</label>
        <select className='polje-pretrage' name="opstina" value={opstina} onChange={handleInputChange}>
          <option value="" disabled>Izaberite opštinu</option>
          {LokacijeOpstina.map(opstina => (
            <option key={opstina.ime} value={opstina.ime}>{opstina.ime}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Tip objekta:</label>
        <select name="tip" value={tip} onChange={handleInputChange}>
          <option disabled value="">Izaberi tip objekta</option>
          <option value="Stan">Stan</option>
          <option value="Kuća">Kuća</option>
          <option value="Lokal">Lokal</option>
          <option value="Kancelarija">Kancelarija</option>
        </select>
      </div>
      <div>
        <label>Cena od(€):</label>
        <input name="cenaOd" type="number" placeholder="Od" value={cenaOd} onChange={handleInputChange} />
      </div>
      <div>
        <label>Cena do(€):</label>
        <input name="cenaDo" type="number" placeholder="Do" value={cenaDo} onChange={handleInputChange} />
      </div>
      <div>
        <button type="submit">Pretražite</button>
      </div>
    </form>
  );
}

export default SearchComponent;
