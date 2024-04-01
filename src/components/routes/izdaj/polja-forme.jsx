import {React, useRef} from 'react';
import LokacijeOpstina from "../home/landing/opstine/lokacije-opstina";
import './polja-forme.scss'
const PoljaForme = ({ podaciForme, setPodaciForme }) => {


  const autoResizeTextArea = () => {
    const textArea = textAreaRef.current;
    textArea.style.height = 'auto'; // Temporarily shrink to auto height
    textArea.style.height = `${textArea.scrollHeight}px`; // Set new height
  };

  const textAreaRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPodaciForme({ ...podaciForme, [name]: value });
        if(name === 'opis') {
          autoResizeTextArea();
      }
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
            <option value="Stan">Stan</option>
            <option value="Kuća">Kuća</option>
            <option value="Lokal">Lokal</option>
            <option value="Kancelarija">Kancelarija</option>
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
      <div>
  <label>
    Detaljno opišite vaš stambeni objekat:
    <textarea 
  ref={textAreaRef}
  className='opisObjekta' 
  name='opis' 
  value={podaciForme.opis} 
  onChange={handleChange} 
  required 
/>
  </label>
</div>
    </>
  );
};

export default PoljaForme;

