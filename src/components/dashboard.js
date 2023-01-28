import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Starwars from './starwars';
import NavBar from './navBar';
import Cats from './cats';
import Covid from './covid';
import Item from './item';

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/starwars" element={<Starwars testing="new" />}></Route>
        <Route path="/cats" element={<Cats />}></Route>
        <Route path="/covid" element={<Covid />}></Route>
        <Route path="/item" element={<Item />}></Route>
        <Route path="/" element={<Starwars />}></Route>
      </Routes>
    </div>
  );
};

export default Dashboard;
