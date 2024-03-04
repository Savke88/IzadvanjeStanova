// PrikazNekretnina.jsx
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase/firebase";
import "./prikaz-nekretnina.scss";
import FilterPretrage from "./filter-pretrage";

const PrikazNekretnina = () => {
  const [nekretnine, setNekretnine] = useState([]);
  const [filters, setFilters] = useState({
    tipImovine: "",
    tip: "",
    opstina: "",
    lokacija: "",
    cenaOd: "",
    cenaDo: "",
    kvadraturaOd: "",
    kvadraturaDo: "",
  });
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Nektretnine"));
      const nekretnineList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNekretnine(nekretnineList);
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredNekretnine = nekretnine.filter((nekretnina) => {
    return (
      (filters.tipImovine
        ? nekretnina.tipImovine === filters.tipImovine
        : true) &&
      (filters.tip ? nekretnina.tip === filters.tip : true) &&
      (filters.opstina ? nekretnina.opstina === filters.opstina : true) &&
      (filters.lokacija ? nekretnina.lokacija === filters.lokacija : true) &&
      (filters.cenaOd ? nekretnina.cena >= Number(filters.cenaOd) : true) &&
      (filters.cenaDo ? nekretnina.cena <= Number(filters.cenaDo) : true) &&
      (filters.kvadraturaOd
        ? nekretnina.kvadratniMetar >= Number(filters.kvadraturaOd)
        : true) &&
      (filters.kvadraturaDo
        ? nekretnina.kvadratniMetar <= Number(filters.kvadraturaDo)
        : true)
    );
  });

  return (
    <div className="nekretnine-container">
      <FilterPretrage onFilterChange={handleFilterChange} />
      <div className="nekretnine-sadrzaj">
        <div className="nekretnine-grid">
          {filteredNekretnine.map((nekretnina) => (
            <div key={nekretnina.id} className="nekretnina-card">
              <h3>{nekretnina.ime}</h3>
              <p>{nekretnina.tipImovine}</p>
              <div className="nekretnina-slika">
                {nekretnina.images &&
                  nekretnina.images.map((image, index) => (
                    <img key={index} src={image} alt={`Slika ${index + 1}`} />
                  ))}
                
              </div>
              <p>{nekretnina.tip}</p>
                <p>Opština:{nekretnina.opstina}</p>
                <p>Mesto:{nekretnina.lokacija}</p>
                <p>Adresa:{nekretnina.adresa}</p>
                <p>Cena:{nekretnina.cena} €</p>
                <p>Kvadranih metara:{nekretnina.kvadratniMetar} m²</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrikazNekretnina;
