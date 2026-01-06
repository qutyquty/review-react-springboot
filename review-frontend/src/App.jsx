import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import ReviewsPage from './pages/ReviewsPage';
import ReviewDetailPage from './pages/ReviewDetailPage';

const App = () => {
  return (    
    <BrowserRouter>
      <div>
        <Header />
        <main className='container pt-5'>
          <Routes>
            <Route path="/" element={<ReviewsPage />} />
            <Route path="/reviews/:id/:tmdbId" element={<ReviewDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>    
    </BrowserRouter>
  );
};

export default App;