import React from 'react';
import './prikaz-slika.scss';
import CarouselPrikazSlika from './carousel-prikaz-slika';

const PrikazSlika = ({ slike, setSlike }) => {
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && slike.length + files.length <= 10) {
      const noveSlike = Array.from(files).map(file => ({
        file: file,
        prikaz: URL.createObjectURL(file),
        name: file.name
      }));
      setSlike(prevSlike => [...prevSlike, ...noveSlike]);
    } else {
      alert('Greška, možete maksimalno objaviti 10 slika.');
    }
  };
  

// In PrikazSlika.jsx
const brisanjeSlika = (imageName) => {
  setSlike(prevImages => prevImages.filter(image => image.name !== imageName));
};


  return (
    <div className="Omotac-za-slike">
      <label htmlFor="slike" className="licni-unos-slika">
        Izaberite slike za vaš objekat
      </label>
      <input
        id="slike"
        type="file"
        name="slike"
        onChange={handleFileChange}
        multiple
        accept="image/*"
        style={{ display: 'none' }}
      />
      <CarouselPrikazSlika slike={slike} onRemove={brisanjeSlika} />
    </div>
  );
};

export default PrikazSlika;
