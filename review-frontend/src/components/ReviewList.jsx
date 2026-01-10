import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { getPagingReviews } from '../api/reviewApi';
import "./ReviewList.css";

const ReviewList = ({ categoryId }) => {
    const [reviews, setReviews] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [size, setSize] = useState(10);
    const [pagingInfo, setPagingInfo] = useState({
        currentPage: 1,
        totalPages: 0,
        startPage: 1,
        endPage: 1,
    });

    const fetchData = async (page, categoryId, keyword) => {
        try {
            const data = await getPagingReviews(page, size, categoryId, keyword);
            setReviews(data.content);
            setPagingInfo({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                startPage: data.startPage,
                endPage: data.endPage,
            });
            setTotalCount(data.totalCount);
        } catch (err) {
            console.error(err);
        }
    };    

    useEffect(() => { 
        fetchData(pagingInfo.currentPage, categoryId);
    }, [pagingInfo.currentPage, categoryId]); // currentPage가 바뀔 때마다 실행

    // 페이지 번호 클릭 핸들러
    const handlePageClick = (pageNum) => {
        setPagingInfo(prev => ({ ...prev, currentPage: pageNum }));
    };

    const handleSearch = () => {
        fetchData(1, categoryId, keyword);
    };

    const categoryMap = {
        1: "영화",
        2: "드라마",
        3: "애니",
        4: "도서"
    };

  return (
    <section>
        <div className='table-wrapper'>
            <div className='row mb-3'>
                <div className='col-md-3'>
                    <h3>{categoryMap[categoryId]}</h3>
                </div>
                <div className='col-md-2'></div>
                <div className='col-md-3'>
                    <input type='text' className='form-control'
                        placeholder='검색어 입력' value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <div className='col-md-2'>
                    <button className='btn btn-primary w-100' onClick={handleSearch}>검색</button>
                </div>
                <div className='col-md-2'>
                    <Link to={`/reviews/new/${categoryId}`} className='btn btn-primary w-100'>작성하기</Link>
                </div>
            </div>

            <table className='table table-bordered table-striped text-center align-middle'>
                <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "55%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "20%" }} />
                </colgroup>
                <thead className='table-dark'>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>개봉/첫방영연도</th>
                        <th>작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => (
                        <tr key={review.id}>
                            <td>{totalCount - ((pagingInfo.currentPage - 1) * size + index)}</td>
                            <td className='text-start'>
                                <Link to={`/review/${categoryId}/${review.id}/${review.tmdbId}`}>{review.title}</Link>
                            </td>
                            <td>{review.firstYear}</td>
                            <td>{dayjs(review.createdTime).format("YYYY-MM-DD HH:mm:ss")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/** Pagination */}
        <div className='pagination-wrapper'>
            <nav>
                <ul className="pagination justify-content-center">
                    {/* 맨 처음 */}
                    <li className={`page-item ${pagingInfo.currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => handlePageClick(1)}>
                        {"<<"}
                        </button>
                    </li>

                    {/* 이전 블록 */}
                    <li className={`page-item ${pagingInfo.startPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => handlePageClick(pagingInfo.startPage - 1)}>
                        {"<"}
                        </button>
                    </li>

                    {/* 현재 블록의 페이지 번호들 */}
                    {Array.from({ length: pagingInfo.endPage - pagingInfo.startPage + 1 }, (_, i) => {
                        const pageNum = pagingInfo.startPage + i;
                        return (
                            <li key={pageNum} className={`page-item ${pagingInfo.currentPage === pageNum ? "active" : ""}`}>
                                <button className="page-link" onClick={() => handlePageClick(pageNum)}>
                                {pageNum}
                                </button>
                            </li>
                        );
                    })}

                    {/* 다음 블록 */}
                    <li className={`page-item ${pagingInfo.endPage === pagingInfo.totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => handlePageClick(pagingInfo.endPage + 1)}>
                        {">"}
                        </button>
                    </li>

                    {/* 맨 끝 */}
                    <li className={`page-item ${pagingInfo.currentPage === pagingInfo.totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => handlePageClick(pagingInfo.totalPages)}>
                        {">>"}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
  );
};

export default ReviewList;