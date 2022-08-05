import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import { Home } from './pages/Home/Home';
import { Authenticate } from './pages/Login/Authenticate';

import { HomeAuthenticate } from './pages/Home/HomeAuthenticate';

export default function App() {
  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Authenticate />} />
            <Route exact path='/home' element={<HomeAuthenticate />} />
            <Route
              path='/sample'
              element={
                <main style={{ padding: '1rem', textAlign: 'center' }}>
                  <h1>Logg in first</h1>
                  <p>The page you are looking for doesn't exist</p>
                </main>
              }
            />
            <Route
              path='*'
              element={
                <main style={{ padding: '1rem', textAlign: 'center' }}>
                  <h1>Page Not Found</h1>
                  <p>The page you are looking for doesn't exist</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
        {/* <Home /> */}
      </React.StrictMode>
    </>
  );
}
