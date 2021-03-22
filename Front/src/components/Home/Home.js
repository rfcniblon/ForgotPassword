import React from 'react';
import { HeaderBar } from '../';

const title = {
  pageTitle: 'Suivi de Culture',
};

const Home = () => (
  <div className="home-page">
    <HeaderBar title={title} />
    <a href="/register"> S'inscrire </a>
    <a href="/login"> Connexion </a>
  </div>
);

export default Home;
