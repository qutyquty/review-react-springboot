import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import { getTvDetail } from '../api/tmdbApi';
import DetailLayout from '../components/DetailLayout';

const TvDetailPage = ({ tmdbId }) => {
    const { id } = useParams();
    const [tv, setTv] = useState(null);

    // tmdbId가 있으면 tmdbId를 쓰고, 없으면 id를 쓰도록
    const tvId = tmdbId || id;

    useEffect(() => {
        fetchData(tvId);
    }, [tvId]);

    const fetchData = async (id) => {
        try {
            const detail = await getTvDetail(id);
            setTv(detail);
        } catch (error) {
            console.error("TvDetailPage 에러: ", error);
        }
    };    

    if (!tv) {
        return (
        <Container className='text-center mt-5'>
            <Spinner animation='border' variant='primary' />
            <p>Loading...</p>
        </Container>
        )
    };

  return (
    <DetailLayout
        mtId={tv.id}
        posterPath={tv.poster_path}
        title={tv.name}
        overview={tv.overview}
        releaseDate={tv.first_air_date}
        extraInfo={`시즌 수: ${tv.number_of_seasons}`}
        genres={tv.genres}
        backdropPath={tv.backdrop_path}
        voteAverage={tv.vote_average}
        credits={tv.cast}
    />
  );
};

export default TvDetailPage;