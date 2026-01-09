import React from 'react';
import { useParams } from 'react-router-dom';

import ReviewBody from '../components/ReviewBody';
import MovieDetailPage from './MovieDetailPage';
import TvDetailPage from './TvDetailPage';

const ReviewDetailPage = () => {
  const { id, tmdbId, categoryId } = useParams();
  const numericTmdbId = tmdbId ? Number(tmdbId) : 0;

  console.log(typeof categoryId, categoryId);
  let DetailComponent;
  if (categoryId === "1") {
    DetailComponent = <MovieDetailPage tmdbId={tmdbId} />
  } else {
    DetailComponent = <TvDetailPage tmdbId={tmdbId} />
  }

  return (
    <section className='mt-4'>
      {DetailComponent}
      <ReviewBody reviewId={id} />
    </section>
  );
};

export default ReviewDetailPage;