import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Album from './pages/album';
import Favorites from './pages/favorites';
import Edit from './pages/profile/edit';
import Profile from './pages/profile';
import Search from './pages/search';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/album" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <Edit /> } />
      </Routes>
    </Router>
  );
}

export default App;
