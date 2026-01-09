import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import ReviewsPage from './pages/ReviewsPage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import ActorDetailPage from './pages/ActorDetailPage';
import MovieDetailPage from "./pages/MovieDetailPage"
import TvDetailPage from "./pages/TvDetailPage"
import './App.css'

const App = () => {
  return (    
    <BrowserRouter>
      <div className='main-content'>
        <Header />
        <main className='container'>
          <Routes>
            <Route path="/" element={<ReviewsPage />} />
            <Route path="/review/movie" element={<ReviewsPage categoryId={1} />} />
            <Route path="/review/tv" element={<ReviewsPage categoryId={2} />} />
            <Route path="/review/ani" element={<ReviewsPage categoryId={3} />} />
            <Route path="/review/book" element={<ReviewsPage categoryId={4} />} />
            <Route path="/review/:categoryId/:id/:tmdbId" element={<ReviewDetailPage />} />
            <Route path="/person/:id/detail" element={<ActorDetailPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/tv/:id" element={<TvDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>    
    </BrowserRouter>
  );
};

export default App;