import React from 'react';

import ReviewList from '../components/ReviewList';

const ReviewsPage = ({ categoryId }) => {
  return (
    <section className='mt-4'>
      <ReviewList categoryId={categoryId} />
    </section>
  );
};

export default ReviewsPage;