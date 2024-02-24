import React, { useState } from 'react';
import "./home-search-component.scss"
function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [objectType, setObjectType] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'searchQuery':
        setSearchQuery(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'objectType':
        setObjectType(value);
        break;
      case 'priceFrom':
        setPriceFrom(value);
        break;
      case 'priceTo':
        setPriceTo(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Search Query:', searchQuery);
    console.log('Location:', location);
    console.log('Object Type:', objectType);
    console.log('Price Range:', `${priceFrom} - ${priceTo}`);
  };

  return (
    <form className='forma' onSubmit={handleSubmit}>
      <div>
        <label>Opština:</label>
        <select name="location" value={location} onChange={handleInputChange}>
        <option value="">Izaberi opštinu</option>
          <option value="K.Mitrovica">K.Mitrovica</option>
          <option value="Gracanica">Gračanica</option>
          <option value="Strpce">Štrpce</option>
          <option value="Gnjilane">Gnjilane</option>
        </select>
      </div>
      <div>
        <label>Tip objekta:</label>
        <select name="objectType" value={objectType} onChange={handleInputChange}>
          <option value="">Izaberi tip</option>
          <option value="kuca">Kuća</option>
          <option value="stan">Stan</option>
          <option value="kancelarija">Kancelarija</option>
          <option value="lokal">Lokal</option>
        </select>
      </div>
      <div>
        <label>Cena od:</label>
        <input
          name="priceFrom"
          type="number"
          placeholder="Od"
          value={priceFrom}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Cena do:</label>
        <input
          name="priceTo"
          type="number"
          placeholder="Do"
          value={priceTo}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button type="submit">Pretraži</button>
      </div>
    </form>
  );
}

export default SearchComponent;