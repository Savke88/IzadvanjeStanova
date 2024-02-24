import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './registracija.scss';
import { Link } from "react-router-dom";

const Registracija = () => {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Šifre se ne poklapaju');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMessage('Greška prilikom registracije: ' + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
    } catch (error) {
      setErrorMessage('Greška prilikom Google registracije: ' + error.message);
    }
  };

  return (
    <div className="stranica-registracije">
      <h1>Registracija na stranicu</h1>
      <p>Nemate nalog?</p>
      <p>Registrujte se sa svojim emailom i šifrom</p>
      <form onSubmit={handleSignUp} className="forma-registracije">
      <div className="unos-grupa">
          <input 
            type="text" 
            placeholder="Ime" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
        </div>
        <div className="unos-grupa">
          <input 
            type="text" 
            placeholder="Prezime" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
          />
        </div>
        <div className="unos-grupa">
          <input 
            type="tel" 
            placeholder="Kontakt telefon" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
        </div>
        <div className="unos-grupa">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="unos-grupa">
          <input 
            type="password" 
            placeholder="Šifra" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="unos-grupa">
          <input 
            type="password" 
            placeholder="Potvrdite šifru" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="signup-button">Registruj se</button>
      </form>
      <button onClick={handleGoogleSignIn} className="google-signup-button">
        Registruj se sa Google nalogom
      </button>
      <p>Već imate nalog?</p>
      <li><Link to="/prijava">Prijava</Link></li>
    </div>
  );
};

export default Registracija;
