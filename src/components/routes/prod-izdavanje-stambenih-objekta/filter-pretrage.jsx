// FilterPretrage.jsx
import React from 'react';
import './filter-pretrage.scss'
const FilterPretrage = ({ onFilterChange }) => {
  return (
    <form className="filter-form">
      {/* Replace the following with your actual filter options */}
      <input className='polje-pretrage' 
        name="tipImovine"
        placeholder="Tip imovine"
        onChange={onFilterChange}
      />
      <input className='polje-pretrage'
        name="tip"
        placeholder="Tip"
        onChange={onFilterChange}
      />
      <input className='polje-pretrage'
        name="opstina"
        placeholder="Opština"
        onChange={onFilterChange}
      />
      <input className='polje-pretrage'
        name="lokacija"
        placeholder="Lokacija"
        onChange={onFilterChange}
      />
      {/* You can use <input className='polje-pretrage' type="number"> for numeric values */}
      <input className='polje-pretrage'
        name="cenaOd"
        placeholder="Cena od"
        type="number"
        onChange={onFilterChange}
      />
      <input className='polje-pretrage'
        name="cenaDo"
        placeholder="Cena do"
        type="number"
        onChange={onFilterChange}
      />
      <input className='polje-pretrage'
        name="kvadraturaOd"
        placeholder="m² od"
        type="number"
        onChange={onFilterChange}
      />
      <input className='polje-pretrage'
        name="kvadraturaDo"
        placeholder="m² do"
        type="number"
        onChange={onFilterChange}
      />
      <button type="submit">Pretraži</button>
    </form>
  );
};

export default FilterPretrage;
