import React from 'react';
import './utisak.korisnika.scss'
import trans from '../../../../../slike/slike-pocetne-stranice/transparentnost.png'
import dkom from '../../../../../slike/slike-pocetne-stranice/direktna-komunikacija.png'
import proviz from '../../../../../slike/slike-pocetne-stranice//provizije.png'
const UtisakKorisnika = () => {
  return (
    <div className='utisak-korisnika'>
      <h1>Prva srpska onlajn agencija za nekretnine na Kosovu</h1>
      <h2>Zašto KiM agencija?</h2>

        <div className='raspored'>
        
      <div>
        <img src={trans} alt='Transparentnost'/>
        <h3>Transparentnost</h3>
        <p>Dajemo Vam neograničen pristup multimedijalnoj prezentaciji - profesionalne fotografije, Lako, brzo i inovativno. Jer cenimo vaše vreme!</p>
      </div>

      <div>
      <img src={dkom} alt='Komunikacija'/>
        <h3>Direktna komunikacija</h3>
        <p>Komunicirajte sa vlasnicima nekretnina lako i brzo kroz par klikova na našem sajtu. Samo se registrujte, izaberite željenu nekretninu dogovorite se za datum gledanja i vlasnik će vas to omogućiti!</p>
      </div>

      <div>
      <img src={proviz} alt='Bez provizije'/>
        <h3>Bez provizije i skrivenih troškova</h3>
        <p>Ukoliko tražite stan za iznajmljivanje, tu smo da vam pomognemo potpuno besplatno. Mi štedimo vaš novac jer su nam zakupci na prvom mestu!</p>
      </div>

      </div>

    </div>
  );
};

export default UtisakKorisnika;
