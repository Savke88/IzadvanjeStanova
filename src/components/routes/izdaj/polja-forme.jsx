import React from 'react';
import LokacijeOpstina from "../home/landing/opstine/lokacije-opstina";

const PoljaForme = ({ podaciForme, setPodaciForme }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPodaciForme({ ...podaciForme, [name]: value });
    };

    const filtriranaMesta = podaciForme.opstina ? LokacijeOpstina.find(opstina => opstina.ime === podaciForme.opstina)?.lokacija || [] : [];

    
    return (
    <>
      <div>
        <label>
          Tip imovine:
          <select name="tipImovine" value={podaciForme.tipImovine} onChange={handleChange}>
            <option value="Izdavanje">Izdavanje</option>
            <option value="Prodavanje">Prodavanje</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Tip objekta:
          <select name="tip" value={podaciForme.tip} onChange={handleChange} required>
            <option value="" disabled>Odaberite tip</option>
            <option value="stan">Stan</option>
            <option value="kuća">Kuća</option>
            <option value="lokal">Lokal</option>
            <option value="kancelarija">Kancelarija</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Ime objekta:
          <input type="text" name="ime" value={podaciForme.ime} onChange={handleChange} required />
        </label>
      </div>

      <div>
        <label>
          Opština:
          <select name="opstina" value={podaciForme.opstina} onChange={handleChange} required>
            <option value="" disabled>Opština</option>
            {LokacijeOpstina.map(opstina => (
              <option key={opstina.ime} value={opstina.ime}>{opstina.ime}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Lokacija:
          <select name="lokacija" value={podaciForme.lokacija} onChange={handleChange} required>
            <option value="" disabled>Lokacija</option>
            {filtriranaMesta.map(lokacija => (
              <option key={lokacija} value={lokacija}>{lokacija}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Adresa:
          <input type="text" name="adresa" value={podaciForme.adresa} onChange={handleChange} required />
        </label>
      </div>

      <div>
        <label>
          Cena (€):
          <input type="number" name="cena" value={podaciForme.cena} onChange={handleChange} required />
        </label>
      </div>

      <div>
        <label>
          Kvadratnih metara:
          <input type="number" name="kvadratniMetar" value={podaciForme.kvadratniMetar} onChange={handleChange} required />
        </label>
      </div>
    </>
  );
};

export default PoljaForme;
