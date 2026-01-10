package com.example.review.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.review.dto.LastestReviewResponse;
import com.example.review.dto.ReviewCreateRequest;
import com.example.review.dto.ReviewResponse;
import com.example.review.dto.ReviewUpdateRequest;
import com.example.review.mapper.ReviewMapper;

@Service
public class ReviewService {
	
	private final ReviewMapper reviewMapper;
	
	public ReviewService(ReviewMapper reviewMapper) {
		this.reviewMapper = reviewMapper;
	}
	
	// 단일 조회
	@Transactional(readOnly = true)
	public ReviewResponse getReviewById(Long id) {
		return reviewMapper.findById(id);
	}
	
	// 전체 조회
	@Transactional(readOnly = true)
	public List<ReviewResponse> getAllReviews() {
		return reviewMapper.findAll();
	}
	
	@Transactional(readOnly = true)
	public Map<String, Object> getPagingReviews(int page, int size, int categoryId, String keyword) {
		int offset = (page - 1) * size;
		List<ReviewResponse> reviews = reviewMapper.pagingReviews(size, offset, categoryId, keyword);
		int totalCount = reviewMapper.countReviews(categoryId, keyword);
		int totalPages = (int) Math.ceil((double) totalCount / size);
		
		// 페이지 블록 계산
		int pageBlockSize = 10;
		int currentBlock = (page - 1) / pageBlockSize;
		int startPage = currentBlock * pageBlockSize + 1;
		int endPage = Math.min(startPage + pageBlockSize - 1, totalPages);
		
		Map<String, Object> result = new HashMap<>();
		result.put("content", reviews);
		result.put("currentPage", page);
		result.put("totalPages", totalPages);
		result.put("startPage", startPage);
		result.put("endPage", endPage);
		result.put("pageBlockSize", pageBlockSize);
		result.put("totalCount", totalCount);
				
		return result;
	}
	
	@Transactional(readOnly = true)
	public List<LastestReviewResponse> getLastestReview(int categoryId) {
		return reviewMapper.findLastestReview(categoryId);
	}
	
	@Transactional
	public Long createReview(ReviewCreateRequest req) {
		reviewMapper.insertReview(req);
		return req.getId(); // MyBatis가 자동으로 채워준 PK
	}
	
	@Transactional
	public boolean deleteReview(Long id) {
		int rows = reviewMapper.deleteReview(id);
		return rows > 0; // 삭제 성공 여부 반환
	}
	
	@Transactional
	public boolean updateReview(Long id, ReviewUpdateRequest req) {
		int rows = reviewMapper.updateReview(id, req);
		return rows > 0; // 수정 성공 여부 반환
	}
}
