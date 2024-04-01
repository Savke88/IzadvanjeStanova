import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../slike/logo.png";
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userRef = doc(db, 'users', user.uid); 
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data()); 
        } else {
          console.log('Traženi korisnik ne postoji');
        }
      } else {
        setUserData(null); 
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Greška prilikom odjavljivanja", error);
    });
  };

  const displayName = userData ? `${userData.firstName} ${userData.lastName}` : currentUser?.displayName || currentUser?.email;

  return (
    <header>
      <div className="left-components">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Početna</Link></li>
            <li><Link to="/nekretnine">Nekretnine</Link></li>
            <li><Link to="/kontakt">Kontakt</Link></li>
          </ul>
        </nav>
      </div>
      <div className="right-components">
        <nav>
          <ul>
            {/* <li><Link to="/pretraga">Pretraga</Link></li> */}
            <li><Link to="/izdaj">Izdavanje/Prodavanje</Link></li>
            {currentUser ? (
              <>
                <li>{displayName}</li>
                <li><button className="odjava" onClick={handleSignOut}>Odjava</button></li>
              </>
            ) : (
              <>
                <li><Link to="/prijava">Prijava</Link></li>
                <li><Link to="/registracija">Registracija</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
