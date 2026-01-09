package com.example.review.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.review.domain.Review;
import com.example.review.service.ReviewService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/reviews")
@Tag(name = "Review API", description = "리뷰 CRUD API")
public class ReviewController {
	
	private final ReviewService reviewService;
	
	public ReviewController(ReviewService reviewService) {
		this.reviewService = reviewService;
	}
	
	@Operation(summary = "리뷰 단일 조회", description = "ID로 리뷰를 조회합니다.")
	@GetMapping("/{id}")
	public Review getReviewById(@PathVariable("id") Long id) {
		return reviewService.getReviewById(id);
	}
	
	@Operation(summary = "리뷰 전체 조회", description = "모든 리뷰를 조히합니다.")
	@GetMapping
	public List<Review> getAllReviews() {
		return reviewService.getAllReviews();
	}
	
	@GetMapping("/paging")
	public Map<String, Object> getPagingReviews(
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "size", defaultValue = "10") int size,
			@RequestParam(value = "categoryId", defaultValue = "1") int categoryId,
			@RequestParam(value = "keyword", defaultValue = "") String keyword) {
		return reviewService.getPagingReviews(page, size, categoryId, keyword);
	}

}
