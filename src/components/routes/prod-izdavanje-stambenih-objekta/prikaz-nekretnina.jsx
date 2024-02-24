import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebase/firebase'; 
import './prikaz-nekretnina.scss'

const PrikazNekretnina = () => {
    const [nekretnine, setNekretnine] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "Nektretnine"));
            const nekretnineList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNekretnine(nekretnineList);
        };

        fetchData();
    }, []);

    return (
        <div className="nekretnine-container">
            <div className="nekretnine-grid">
                {nekretnine.map(nekretnina => (
                    <div key={nekretnina.id} className="nekretnina-card">
                        <h3>{nekretnina.ime}</h3>
                        <p>{nekretnina.tipImovine}</p>
                        <div className="nekretnina-images">
                            {nekretnina.images && nekretnina.images.map((image, index) => (
                                <img key={index} src={image} alt={`Slika ${index + 1}`} />
                            ))}
                        </div>
                        
                        <p>{nekretnina.tip}</p>
                        <p>{nekretnina.opstina}</p>
                        <p>{nekretnina.lokacija}</p>
                        <p>{nekretnina.adresa}</p>
                        <p>{nekretnina.cena} €</p>
                        <p>{nekretnina.kvadratniMetar}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrikazNekretnina;
