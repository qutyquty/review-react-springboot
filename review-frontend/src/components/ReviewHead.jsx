import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMovieDetail } from '../api/tmdbApi';

const ReviewHead = ({ tmdbId }) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (tmdbId > 0) {
      fetchMovieDetail(tmdbId);
    }
    setLoading(false);
  }, [tmdbId]);

  const fetchMovieDetail = async (tmdbId) => {
    try {
      const data = await getMovieDetail(tmdbId);
      setMovie(data);
      setCast(data.cast);
    } catch (error) {
      console.error("fetchMovieDetail 에러: ", error);
    }
  };

  if (loading) {
    return (
      <div className='text-center mt-5'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading ...</span>
        </div>
      </div>
    );
  }

  if (!loading && !movie) {
    return (
      <div className="mt-5 mb-4 p-3 border border-danger rounded bg-light text-start">
        <span className="text-danger fw-bold">TMDB에서 데이터를 가져오지 못했습니다.</span>
      </div>
    );
  }

   return (
    <div className="mb-4">
      {/* 백드롭 영역 */}
      <div
        style={{
            position: "relative",
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            borderRadius: "8px",
            minHeight: "500px",
            color: "white",
            display: "flex",
            alignItems: "flex-end" // 하단 정렬
        }}
      >
        {/* 오버레이 */}
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)", // 반투명 검정
                borderRadius: "8px"
            }}
        >
        </div>

        {/* 텍스트 */}
        <div
            style={{
                position: "relative",
                padding: "2rem",
                textShadow: "2px 2px 6px rgba(0,0,0,0.8)" // 글자 또렷하게
            }}
        >
          <h2 className="fw-bold">{movie.title}</h2>
          <p className="mt-3">{movie.overview}</p>
        </div>
      </div>

      {/* 포스터 + 출연 배우 */}
      <div className="row mt-4">
        {/* 왼쪽: 포스터 */}
        <div className="col-md-3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* 오른쪽: 출연 배우 */}
        <div className="col-md-9">
          <h5 className="mb-3">출연 배우</h5>
          <div className="d-flex flex-wrap">
            {cast.slice(0, 12).map((actor) => (
              <div              
                key={actor.cast_id}
                className="me-3 mb-3 text-center"
                style={{ width: "100px" }}
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://placehold.co/100x150?text=No+Image"
                  }
                  alt={actor.name}
                  className="rounded"
                  style={{
                    width: "100px",
                    height: "150px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/person/${actor.id}/detail`)}
                />
                <small className="d-block mt-1">{actor.name}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewHead;