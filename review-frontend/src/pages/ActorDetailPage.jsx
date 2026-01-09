import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Tabs, Tab, Spinner } from 'react-bootstrap';

import { getActorDetail } from '../api/tmdbApi';
import ContentCard from "../components/ContentCard";

const ActorDetailPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [actorDetail, setActorDetail] = useState(null);

    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (id) => {
        try {
            const data = await getActorDetail(id);
            setActorDetail(data);
        } catch (error) {
            console.error("ActorDetailPage 에러: ", error);
        } finally {
            setLoading(false);
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

    const actorImg = actorDetail.actor?.profile_path
        ? `https://image.tmdb.org/t/p/w300${actorDetail.actor.profile_path}`
        : "https://placehold.co/150x225?text=No+Image";    

  return (
    <Container className='mt-5'>
        {/** 배우 정보 */}
        <Row className='mb-4'>
            {/** 왼쪽: 프로필 사직 */}
            <Col md={4} className='text-center'>
                <img src={actorImg} alt={actorDetail.actor?.name}
                    style={{ width: "100%", maxWidth: "200px", height: "auto", objectFit: "cover", borderRadius: "8px" }}
                />
            </Col>
            {/** 오른쪽: 배우 정보 */}
            <Col md={8}>
                <h2>{actorDetail.actor?.name}</h2>
                <p><strong>생년월일:</strong> {actorDetail.actor?.birthday || "정보 없음"}</p>
                <p><strong>출생지:</strong> {actorDetail.actor?.place_of_birth || "정보 없음"}</p>
                <p style={{ whiteSpace: "pre-line" }}>
                    {actorDetail.actor?.biography ? actorDetail.actor.biography : "약력 정보 없음"}
                </p>
            </Col>
        </Row>

        <Tabs defaultActiveKey="movies" className='mb-3'>
            {/** 영화 탭 */}
            <Tab eventKey="movies" title="출연 영화">
                <Row>
                    {actorDetail.movies.map(movie => (
                        <Col key={movie.credit_id || movie.id} xs={6} md={4} lg={3} className='mb-4'>
                            <ContentCard 
                                id={movie.id}
                                title={movie.title}
                                posterPath={movie.poster_path}
                                releaseDate={movie.release_date}
                                type="movie"
                            />                            
                        </Col>
                    ))}
                </Row>
            </Tab>

            {/** 드라마 탭 */}
            <Tab eventKey="tv" title="출연 드라마/쇼">
                <Row>
                    {actorDetail.tvShows.map(tv => (
                        <Col key={tv.credit_id || tv.id} xs={6} md={4} lg={3} className='mb-4'>
                            <ContentCard 
                                id={tv.id}
                                title={tv.name}
                                posterPath={tv.poster_path}
                                releaseDate={tv.first_air_date}
                                type="tv"
                            />
                        </Col>
                    ))}
                </Row>
            </Tab>
        </Tabs>
    </Container>
  );
};

export default ActorDetailPage;