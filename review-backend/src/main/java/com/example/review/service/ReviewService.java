package com.example.review.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.review.domain.Review;
import com.example.review.mapper.ReviewMapper;

@Service
public class ReviewService {
	
	private final ReviewMapper reviewMapper;
	
	public ReviewService(ReviewMapper reviewMapper) {
		this.reviewMapper = reviewMapper;
	}
	
	// 단일 조회
	public Review getReviewById(Long id) {
		return reviewMapper.findById(id);
	}
	
	// 전체 조회
	public List<Review> getAllReviews() {
		return reviewMapper.findAll();
	}
	
	public Map<String, Object> getPagingReviews(int page, int size, int categoryId, String keyword) {
		int offset = (page - 1) * size;
		List<Review> reviews = reviewMapper.pagingReviews(size, offset, categoryId, keyword);
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
	
}
