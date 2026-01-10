import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

import { getSearchTitle } from '../api/tmdbApi';
import TvDetailPage from './TvDetailPage';
import MovieDetailPage from './MovieDetailPage';
import { saveReview } from '../api/reviewApi';

const ReviewForm = () => {
  const { categoryId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [review, setReview] = useState({ 
    title: "", content: "", categoryId: categoryId, 
  });
  const navigate = useNavigate();

  // TMDB 검색
  const handleSearch = async () => {
    const data = await getSearchTitle(searchQuery);
    setSearchResults(data);
  };

  // 리뷰 저장
  const handleSave = async () => {
    try {
      await saveReview(selectedMovie, review);
      alert("리뷰가 저장되었습니다!");
      navigate("/");
    } catch (error) {
      alert("리뷰 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mt-4">
      <Row>
        {/* 상단 영역 */}
        <Col md={12} className="mb-4">
          <Button onClick={() => setShowModal(true)}>TMDB 검색</Button>

          {selectedMovie && (
            <Card className='mt-3'>
            <Card.Body className='pt-0'>
            {categoryId == 1 ? (
                <MovieDetailPage tmdbId={selectedMovie.id} />
            ) : (
                <TvDetailPage tmdbId={selectedMovie.id} />
            )}
            </Card.Body>
            </Card>
          )}          
        </Col>

        {/* 하단 영역 */}
        <Col md={12}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>리뷰 제목</Form.Label>
              <Form.Control
                type="text"
                value={review.title}
                onChange={(e) => setReview({ ...review, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>리뷰 내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={review.content}
                onChange={(e) =>
                  setReview({ ...review, content: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="success" onClick={handleSave}>
              저장하기
            </Button>
          </Form>
        </Col>
      </Row>

      {/* TMDB 검색 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>TMDB 영화 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex mb-3">
            <Form.Control
              type="text"
              placeholder="영화 제목 입력"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch} className="ms-2 w-25">
              검색
            </Button>
          </Form>
          <Row>
            {searchResults.map((movie) => (
              <Col md={3} key={movie.id} className="mb-3">
                <Card
                  onClick={() => {
                    setSelectedMovie(movie);
                    setShowModal(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewForm;