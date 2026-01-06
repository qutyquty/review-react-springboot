import React from 'react';
import { useParams } from 'react-router-dom';

import ReviewBody from '../components/ReviewBody';
import ReviewHead from '../components/ReviewHead';

const ReviewDetailPage = () => {
  const { id, tmdbId } = useParams();

  return (
    <section className='mt-4'>
      <h2 className='mb-4'>리뷰 상세</h2>
      <ReviewHead tmdbId={tmdbId} />
      <ReviewBody reviewId={id} />
    </section>
  );
};

export default ReviewDetailPage;