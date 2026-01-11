import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';

import { getSearchTitle } from '../api/tmdbApi';
import TvDetailPage from './TvDetailPage';
import MovieDetailPage from './MovieDetailPage';
import { getReviewById, saveReview, updateReview } from '../api/reviewApi';

const ReviewForm = ({ mode }) => {
  const { categoryId, id, tmdbId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMT, setSelectedMT] = useState(null);
  const [review, setReview] = useState({ 
    title: "", content: "", categoryId: categoryId,
  });
  const navigate = useNavigate();

  // 수정 모드일 때 초기값 채우기
  useEffect(() => {
    if (mode === "edit" && id) {
      fetchData(id);
      setSelectedMT((prev) => ({
        ... prev,
        id: tmdbId,
      }));
    }
  }, [mode, id]);

  const fetchData = async (id) => {
      try {
          const data = await getReviewById(id);
          setReview(data);
      } catch (err) {
          console.error(err);
      }
  };  

  // TMDB 검색
  const handleSearch = async () => {
    setPage(1); // 새 검색이므로 페이지 초기화
    const data = await getSearchTitle(searchQuery, 1);
    setSearchResults(data);
  };

  // tmdb는 검색 api 요청시 넘어오는 데이터는 최대 20개다.
  // 검색 데이터가 20가 넘을 경우 더보기 버튼으로 처리
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    const data = await getSearchTitle(searchQuery, nextPage);
    setSearchResults((prev) => [...prev, ...data]);
    setPage(nextPage);
  };

  // 리뷰 저장&업데이트
  const handleSave = async () => {
    try {
      let firstYear = "";
      if (selectedMT?.media_type === "movie" && selectedMT?.release_date) {
        firstYear = selectedMT?.release_date.substring(0, 4);
      } else if (selectedMT?.media_type === "tv" && selectedMT?.first_air_date) {
        firstYear = selectedMT?.first_air_date.substring(0, 4);
      }

      if (mode === "create") {
        await saveReview(selectedMT, review, firstYear);
        navigate("/");
      } else {
        await updateReview(id, selectedMT, review, firstYear);
        navigate(`/review/${categoryId}/${id}/${selectedMT.id}`);
      }
    } catch (error) {
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mt-4">
      <Row>
        {/* 상단 영역 */}
        <Col md={12} className="mb-4">
          <Button onClick={() => setShowModal(true)}>TMDB 검색</Button>

          {selectedMT && (
            <Card className='mt-3'>
            <Card.Body className='pt-0'>
            {categoryId == 1 ? (
                <MovieDetailPage tmdbId={selectedMT.id} />
            ) : (
                <TvDetailPage tmdbId={selectedMT.id} />
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
              {mode === "edit" ? "수정" : "등록"}
            </Button>
          </Form>
        </Col>
      </Row>

      {/* TMDB 검색 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>TMDB 검색</Modal.Title>
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
            {searchResults.map((mt) => (
              <Col md={3} key={mt.id} className="mb-3">
                <Card
                  onClick={() => {
                    setSelectedMT(mt);
                    setShowModal(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={
                      mt.poster_path
                      ? `https://image.tmdb.org/t/p/w200${mt.poster_path}`
                      : "https://placehold.co/200x300?text=No+Image"
                    }
                  />
                  <Card.Body>
                    <Card.Title>{mt.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className='text-center mt-3'>
            <Button onClick={handleLoadMore}>더보기</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewForm;