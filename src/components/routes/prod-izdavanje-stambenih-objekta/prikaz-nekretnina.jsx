// PrikazNekretnina.jsx
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase/firebase";
import "./prikaz-nekretnina.scss";
import FilterPretrage from "./filter-pretrage";
import CarouselPrikazNekretnina from "./carousel-prikaz-nekretnina";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const PrikazNekretnina = () => {
  const [nekretnine, setNekretnine] = useState([]);
  const [displayedNekretnine, setDisplayedNekretnine] = useState([]);
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
  const location = useLocation();
  const searchParams = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Nektretnine"));
      const nekretnineList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNekretnine(nekretnineList);
      if(searchParams){
        applyFilters(nekretnineList, searchParams)
      }else{
      setDisplayedNekretnine(nekretnineList);
    }
    };

    fetchData();

  }, [db]);

  useEffect(() => {
    try {
      const state = location.state || {};
      if (state.searchParams) {
        // If search parameters are provided by SearchComponent
        setFilters(prevFilters => ({ ...prevFilters, ...state.searchParams }));
        applyFilters(nekretnine, { ...filters, ...state.searchParams });
      } else if (state.selectedOpstina) {
        // If an opstina is selected from the Opstine component
        setFilters(prevFilters => ({ ...prevFilters, opstina: state.selectedOpstina }));
        applyFilters(nekretnine, { ...filters, opstina: state.selectedOpstina });
      }
      // If neither searchParams nor selectedOpstina is provided, do nothing (keep displaying all nekretnine)
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  }, [location.state, nekretnine]);

  const applyFilters = (properties, filters) => {
    const filteredProperties = properties.filter(nekretnina => {
      return (
        (!filters.tip || nekretnina.tip === filters.tip) &&
        (!filters.opstina || nekretnina.opstina === filters.opstina) &&
        (!filters.cenaOd || nekretnina.cena >= Number(filters.cenaOd)) &&
        (!filters.cenaDo || nekretnina.cena <= Number(filters.cenaDo))
        // Continue with other filters as necessary
      );
    });
    setDisplayedNekretnine(filteredProperties);
  };

  const handleFilterSubmit = (newFilters) => {
    setFilters(newFilters);
    const filtered = nekretnine.filter((nekretnina) => {
      return (
        (newFilters.tipImovine
          ? nekretnina.tipImovine === newFilters.tipImovine
          : true) &&
        (newFilters.tip ? nekretnina.tip === newFilters.tip : true) &&
        (newFilters.opstina
          ? nekretnina.opstina === newFilters.opstina
          : true) &&
        (newFilters.lokacija
          ? nekretnina.lokacija === newFilters.lokacija
          : true) &&
        (newFilters.cenaOd
          ? nekretnina.cena >= Number(newFilters.cenaOd)
          : true) &&
        (newFilters.cenaDo
          ? nekretnina.cena <= Number(newFilters.cenaDo)
          : true) &&
        (newFilters.kvadraturaOd
          ? nekretnina.kvadratniMetar >= Number(newFilters.kvadraturaOd)
          : true) &&
        (newFilters.kvadraturaDo
          ? nekretnina.kvadratniMetar <= Number(newFilters.kvadraturaDo)
          : true)
      );
    });
    setDisplayedNekretnine(filtered);
  };
  return (
    <div className="nekretnine-container">
      <FilterPretrage onSubmit={handleFilterSubmit} />
      <div className="nekretnine-sadrzaj">
        <div className="nekretnine-grid">
          {displayedNekretnine.map((nekretnina) => (
            <div key={nekretnina.id} className="nekretnina-card">
              <Link to={`/nekretnine/${nekretnina.id}`}>
                <h3>{nekretnina.ime}</h3>
              </Link>
              <p>{nekretnina.tipImovine}</p>
              <div className="nekretnina-slika">
                {nekretnina.images && nekretnina.images.length > 0 ? (
                  <CarouselPrikazNekretnina slike={nekretnina.images} />
                ) : (
                  <p>Nemamo slika za prikazivanje</p>
                )}
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
