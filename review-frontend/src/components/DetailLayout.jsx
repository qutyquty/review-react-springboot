import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DetailLayout = ({
    mtId,
    posterPath,
    title,
    overview,
    releaseDate,
    extraInfo,
    genres,
    backdropPath,
    voteAverage,
    credits    
}) => {
    const navigate = useNavigate();

  return (
    <Container className='mt-4'>
        {/** 상단 배너: backdrop 이미지 */}
        <Card className='bg-dark text-white mb-4'>
            <Card.Img src={`https://image.tmdb.org/t/p/w780${backdropPath}`}
                alt={title}
                style={{ height: "500px", objectFit: "cover" }}
            />
            <Card.ImgOverlay className='d-flex flex-column justify-content-end'>
                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "10px" }}>
                    <Card.Title className='fw-bold'>{title}</Card.Title>
                    <Card.Text>
                        개봉/첫 방영일: {releaseDate} | 평점: ⭐ {voteAverage} / 10
                    </Card.Text>
                    <Card.Text>
                        {overview ? overview : "줄거리 정보 없음"}
                    </Card.Text>                    
                </div>
            </Card.ImgOverlay>
        </Card>

        <Row>
            <Col md={4}>
                <Card>
                    <Card.Img variant='top' src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
                </Card>
            </Col>
            <Col md={8}>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <strong>추가 정보:</strong>{" "}
                            <Badge bg="secondary" key={extraInfo} className='me-1'>
                                {extraInfo}
                            </Badge>
                        </Card.Text>

                        {/* 장르 표시 */}
                        <div className='mb-3'>
                            <strong>장르:</strong>{" "}
                            {genres && genres.map((genre) => (
                            <Badge bg="secondary" key={genre.id} className='me-1'>
                                {genre.name}
                            </Badge>
                            ))}
                        </div>

                        <div className="d-flex flex-wrap">
                            {credits && credits.slice(0, 12).map((actor) => (
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
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  );
};

export default DetailLayout;