import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { getReviewById } from '../api/reviewApi';

const ReviewBody = ({ reviewId }) => {
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(reviewId);
        setLoading(false);
    }, [reviewId]);

    const fetchData = async (reviewId) => {
        try {
            const data = await getReviewById(reviewId);
            setReview(data);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>로딩 중...</p>;
    if (!review) return <p>리뷰를 찾을 수 없습니다.</p>;

  return (
    <div className='container mt-3'>
        <div className='card'>
            <div className='card-body'>
                <p className='card-text' style={{ whiteSpace: "pre-line" }}>{review.content}</p>
                <p className='small text-muted'><strong>작성일자:</strong> {dayjs(review.createdTime).format("YYYY-MM-DD HH:mm:ss")}</p>
                <p className='small text-muted'><strong>수정일자:</strong> {dayjs(review.updatedTime).format("YYYY-MM-DD HH:mm:ss")}</p>
            </div>
        </div>
    </div>
  );
};

export default ReviewBody;