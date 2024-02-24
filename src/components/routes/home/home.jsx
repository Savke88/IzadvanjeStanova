import React from 'react';
import './home.scss';
import SearchComponent from '../../pretraga/home-search-component';
import Landing from './landing/landing'
const Home = () => {
  return (
    <div> 
      <div className="pocetno">
        <h1>Nadjite stan po vašoj želji</h1>
        <div className="pretraga">
          <SearchComponent />
        </div>
      </div>
      <Landing />
    </div>
  );
}

export default Home;