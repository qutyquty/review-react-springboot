import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ReviewsPage from './pages/ReviewsPage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import ActorDetailPage from './pages/ActorDetailPage';
import MovieDetailPage from "./pages/MovieDetailPage"
import TvDetailPage from "./pages/TvDetailPage"
import ReviewForm from './pages/ReviewForm';
import './App.css'

const App = () => {
  return (    
    <BrowserRouter>
      <div className='main-content'>
        <Header />
        <main className='container'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reviews/movies" element={<ReviewsPage categoryId={1} />} />
            <Route path="/reviews/dramas" element={<ReviewsPage categoryId={2} />} />
            <Route path="/reviews/animes" element={<ReviewsPage categoryId={3} />} />
            <Route path="/reviews/books" element={<ReviewsPage categoryId={4} />} />
            <Route path="/review/:categoryId/:id/:tmdbId" element={<ReviewDetailPage />} />
            <Route path="/person/:id/detail" element={<ActorDetailPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/tv/:id" element={<TvDetailPage />} />
            <Route path="/reviews/new/:categoryId" element={<ReviewForm mode="create" />} />
            <Route path="/reviews/:categoryId/:id/:tmdbId/edit" element={<ReviewForm mode="edit" />} />
          </Routes>
        </main>
        <Footer />
      </div>    
    </BrowserRouter>
  );
};

export default App;