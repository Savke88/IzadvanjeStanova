import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, getFirestore, deleteDoc, updateDoc } from "firebase/firestore";
import { app } from "../../firebase/firebase";
import CarouselPrikazNekretnina from "./carousel-prikaz-nekretnina";
import { getAuth } from "firebase/auth";
import "./detalji-posebnih-nekretnina.scss";
import PotvrdaBrisanjaModal from "./potvrda-brisanja-modal";
const DetaljiPosebnihNekretnina = () => {
  const [imanje, setImanje] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const currentUser = auth.currentUser; 
  const [editMode, setEditMode] = useState(false);
  const [editedOpis, setEditedOpis] = useState(""); 

  useEffect(() => {
    const fetchImanje = async () => {
      const docRef = doc(db, "Nektretnine", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setImanje({ id: docSnap.id, ...data });
        setEditedOpis(data.opis);
        
        if (data.userId) {
          const userRef = doc(db, "users", data.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUser({ id: userSnap.id, ...userSnap.data() });
          }
        }
      } else {
        console.log("No such document!");
      }
    };

    fetchImanje();
  }, [id, db]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "Nektretnine", id));
    navigate('/');
  };
  const handleSave = async () => {
    const imanjeRef = doc(db, "Nektretnine", id);
    await updateDoc(imanjeRef, { opis: editedOpis });
    setEditMode(false); // Exit edit mode
  };

  if (!imanje || (imanje.userId && !user)) return <div>Loading...</div>;

  return (
    <div className="imanje">
      <h1>{imanje.ime}</h1>
      <div className="imanje-slika">
        {imanje.images && imanje.images.length > 0 ? (
          <CarouselPrikazNekretnina slike={imanje.images} />
        ) : (
          <p>Nemamo slike za prikazivanje</p>
        )}
      </div>
      <div className="red-detalji">
        <p><strong>Tip Imovine:</strong> {imanje.tipImovine}</p>
        <p><strong>Tip objekta:</strong> {imanje.tip}</p>
      </div>
      <div className="red-detalji">
        <p><strong>Opština:</strong> {imanje.opstina}</p>
        <p><strong>Mesto:</strong> {imanje.lokacija}</p>
        <p><strong>Adresa:</strong> {imanje.adresa}</p>
      </div>
      <div className="red-detalji">
        <p><strong>Cena:</strong> {imanje.cena} €</p>
        <p><strong>Kvadratnih Metara:</strong> {imanje.kvadratniMetar} m²</p>
      </div>
      {user && (
        <div className="red-detalji">
          <p><strong>Ime:</strong> {user.firstName}</p>
          <p><strong>Prezime:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Telefon:</strong> {user.phone}</p>
        </div>
      )}
      <p className="opis">
        <strong>Opis:</strong> 
        {!editMode ? (
          imanje.opis
        ) : (
          <textarea
            value={editedOpis}
            onChange={(e) => setEditedOpis(e.target.value)}
          />
        )}
      </p>
      {currentUser && currentUser.uid === imanje.userId && (
        <>
          <button onClick={() => setShowModal(true)}>Delete Post</button>
          {!editMode ? (
            <button onClick={() => setEditMode(true)}>Edit Description</button>
          ) : (
            <button onClick={handleSave}>Save</button>
          )}
          <PotvrdaBrisanjaModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              handleDelete();
              setShowModal(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default DetaljiPosebnihNekretnina;
