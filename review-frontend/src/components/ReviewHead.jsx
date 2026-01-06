import React, { useEffect, useState } from 'react';
import axios from "axios";

const ReviewHead = ({ tmdbId }) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("tmdbId: ", tmdbId);
        const apiKey = "a5b57bbbffa91e1b1a044b0516974c3c"; // TMDB API 키
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}&language=ko-KR`
        );
        const castRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${apiKey}&language=ko-KR`
        );

        setMovie(movieRes.data);
        setCast(castRes.data.cast);
      } catch (error) {
        console.error("TMDB 데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [tmdbId]);

  if (!movie) return <p>로딩 중...</p>;

   return (
    <div className="mb-4">
      {/* 백드롭 영역 */}
      <div
        style={{
            position: "relative",
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
                      : "https://via.placeholder.com/100x150?text=No+Image"
                  }
                  alt={actor.name}
                  className="rounded"
                  style={{
                    width: "100px",
                    height: "150px",
                    objectFit: "cover",
                  }}
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