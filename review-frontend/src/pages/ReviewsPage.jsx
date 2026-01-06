import React from 'react';

import ReviewList from '../components/ReviewList';

const ReviewsPage = () => {
  return (
    <section className='mt-4'>
      <h2 className='mb-4'>리뷰 목록</h2>
      <ReviewList />
    </section>
  );
};

export default ReviewsPage;