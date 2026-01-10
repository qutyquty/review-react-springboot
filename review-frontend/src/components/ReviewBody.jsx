import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';

import { getReviewById, deleteReview } from '../api/reviewApi';

const ReviewBody = ({ reviewId }) => {
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();    

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

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deleteReview(reviewId);
                navigate("/");
            } catch (error) {
                console.error(error);
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    if (loading) return <p>로딩 중...</p>;
    if (!review) return <p>리뷰를 찾을 수 없습니다.</p>;

  return (
    <div className='container mt-3'>
        <div className='card'>
            <div className='card-header border-bottom border-3 border-dark'>
                <h5 className='card-title mb-0'>{review.title}</h5>
            </div>            
            <div className='card-body'>
                <p className='card-text' style={{ whiteSpace: "pre-line" }}>{review.content}</p>
                <p className='small text-muted d-flex jsutify-content-between align-items-center'>
                    <span>
                        <strong>작성일자:</strong> {dayjs(review.createdTime).format("YYYY-MM-DD HH:mm:ss")}
                        {" | "}
                        <strong>수정일자:</strong> {dayjs(review.updatedTime).format("YYYY-MM-DD HH:mm:ss")}
                    </span>
                </p>
            </div>
            {/** 버튼 */}
            <div className='card-footer'>
                <Link to={`/reviews/${review.categoryId}/${review.id}/${review.tmdbId}/edit`} className='btn btn-primary me-2'>수정</Link>
                <button className='btn btn-danger' onClick={handleDelete}>삭제</button>
            </div>
        </div>
    </div>
  );
};

export default ReviewBody;