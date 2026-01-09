import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import { getMovieDetail } from '../api/tmdbApi';
import DetailLayout from '../components/DetailLayout';

const MovieDetailPage = ({ tmdbId, categoryId }) => {
  const { id } = useParams(); // URL에서 영화 ID 추출
  const [movie, setMovie] = useState(null);

  // tmdbId가 있으면 tmdbId를 쓰고, 없으면 id를 쓰도록
  const movieId = tmdbId || id;

  useEffect(() => {
    fetchData(movieId);
  }, [movieId]);

    const fetchData = async (id) => {
        try {
            const data = await getMovieDetail(id);
            setMovie(data);
        } catch (error) {
            console.error("MovieDetailPage 에러: ", error);
        }
    };  

  if (!movie) {
    return (
      <Container className='text-center mt-5'>
        <Spinner animation='border' variant='primary' />
        <p>Loading...</p>
      </Container>
    )
  };

  return (
    <DetailLayout
      mtId={movie.id}
      posterPath={movie.poster_path}
      title={movie.title}
      overview={movie.overview}
      releaseDate={movie.release_date}
      extraInfo={`상영 시간: ${movie.runtime}분`}
      genres={movie.genres}
      backdropPath={movie.backdrop_path}
      voteAverage={movie.vote_average}
      credits={movie.cast}
    />
  );
};

export default MovieDetailPage;