// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';
import logo from '../../slike/logo.png';
import instagram from '../../slike/slike-drustvenih-mreza/instagram_1384015.png';
import facebook from '../../slike/slike-drustvenih-mreza/facebook_1384005.png';
import telegram from '../../slike/slike-drustvenih-mreza/telegram_5968940.png';
import Whatsapp from '../../slike/slike-drustvenih-mreza/whatsapp_254409.png';
import Viber from '../../slike/slike-drustvenih-mreza/viber_3670033.png';

const Footer = () => {
  // const [message, setMessage] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   window.location.href = `mailto:milosftnsavic@gmail.com?subject=Message from Website&body=${encodeURIComponent(message)}`;
  // };

  return (
    <footer>
      <div className="footer star-left">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>
        <div className="contact">
          <Link to="/kontakt">
          <h1><strong>Kontakt</strong></h1>
          </Link>
          <p>Email: milosftnsavic@gmail.com</p>
          <p>Adresa: 7 Knjaza Miloša, Kosovska Mitrovica, Srbija</p>
          <p>Telefon: +381xxxxxxxxx</p>
        </div>
      </div>
      {/* <div className="footer-center">
        <form onSubmit={handleSubmit}>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Imate li pitanja za nas?" 
          />
          <button type="submit" className="send-email-btn">Pošalji poruku putem email-a</button>
        </form>
      </div> */}
      <div className="footer-right">
        <h2><strong>Platforme drustvenih mreža </strong></h2>
        <div className="social-links">
          <a href="https://instagram.com"><img src={instagram} alt="Instagram" /></a>
          <a href="https://facebook.com"><img src={facebook} alt="Facebook" /></a>
          <a href="https://telegram.org"><img src={telegram} alt="Telegram" /></a>
          <a href="https://whatsapp.com/"><img src={Whatsapp} alt="Whatsapp" /></a>
          <a href="https://Viber.com/"><img src={Viber} alt="Viber" /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
