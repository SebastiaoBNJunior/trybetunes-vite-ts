import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Album from './pages/album';
import Favorites from './pages/favorites';
import Edit from './pages/profile/edit';
import Profile from './pages/profile';
import Search from './pages/search';
import Header from './components/Header';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <h1>Project Trybetunes</h1>
      <Routes>
        <Route path="/" Component={ Login } />
        <Route path="/search" Component={ Layout }>
          <Route index Component={ Search } />
        </Route>
        <Route path="/album/:id" Component={ Layout }>
          <Route index Component={ Album } />
        </Route>
        <Route path="/favorites" Component={ Layout }>
          <Route index Component={ Favorites } />
        </Route>
        <Route path="/profile" Component={ Layout }>
          <Route index Component={ Profile } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
