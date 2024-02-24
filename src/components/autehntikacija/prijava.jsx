import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './prijava.scss';
import { Link } from "react-router-dom";
const Prijava = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMessage('Greška prilikom prijave: ' + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
    } catch (error) {
      setErrorMessage('Greška prilikom Google prijave: ' + error.message);
    }
  };

  return (
    <div className="stranica-prijave">
      <h1>Prijava na stranicu</h1>
      <p>Već imate nalog?</p>
      <p>Prijavite se sa svojim emailom i šifrom</p>
      <form onSubmit={handleLogin} className="forma-prijave">
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="signin-button">Prijavi se</button>
      </form>
      <button onClick={handleGoogleSignIn} className="google-signin-button">
        Prijavi se sa Google nalogom
      </button>
      <p>Nemate nalog?</p>
      <p>Registrujte se sa svojim emailom i šifrom</p>
      <li><Link to="/registracija">Registracija</Link></li>
    </div>
  );
};

export default Prijava;
