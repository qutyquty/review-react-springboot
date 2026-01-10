import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { getLastestReview } from '../api/reviewApi';

const HomePage = () => {
    const [data, setData] = useState({
        movies: [],
        dramas: [],
        animes: [],
        books: []
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getLastestReview();
            setData(data);
        } catch (err) {
            console.error(err);
        }
    };    

    // 공통 섹센 컴포넌트
    const Section = ({ title, items, link }) => (
        <Card className='mb-4 shadow-sm w-100'>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <ListGroup variant='flush'>
                    {items.map((item, idx) => (
                        <ListGroup.Item key={idx}>
                            <small className='text-muted'>
                                {dayjs(item.createdTime).format("YYYY-MM-DD")}
                            </small>{" "}
                            <Link to={`/review/${item.categoryId}/${item.id}/${item.tmdbId}`}>{item.title}</Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className='d-flex justify-content-end mt-3'>
                    <Link to={link}>
                        <Button variant="primary">더보기</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );

  return (
    <Container className='mt-4'>
        <Row>
            <Col md={6}>
                <Section title="영화" items={data.movies} link="/reviews/movies" />
            </Col>
            <Col md={6}>
                <Section title="드라마" items={data.dramas} link="/reviews/dramas" />
            </Col>
            <Col md={6}>
                <Section title="애니" items={data.animes} link="/reviews/animes" />
            </Col>
            <Col md={6}>
                <Section title="도서" items={data.books} link="/reviews/books" />
            </Col>
        </Row>
    </Container>
  );
};

export default HomePage;