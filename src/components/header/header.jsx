import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../slike/logo.png";
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      // Handle errors here
      console.error("Error signing out", error);
    });
  };

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
            <li><Link to="/izdaj">Izdajte vašu nekretninu</Link></li>
            {currentUser ? (
              <>
                <li>{currentUser.displayName || currentUser.email}</li>
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
