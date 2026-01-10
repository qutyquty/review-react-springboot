package com.example.review.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.review.dto.LastestReviewResponse;
import com.example.review.dto.ReviewCreateRequest;
import com.example.review.dto.ReviewResponse;
import com.example.review.dto.ReviewUpdateRequest;
import com.example.review.service.ReviewService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

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
	public ReviewResponse getReviewById(@PathVariable("id") Long id) {
		return reviewService.getReviewById(id);
	}
	
	@Operation(summary = "리뷰 전체 조회", description = "모든 리뷰를 조히합니다.")
	@GetMapping
	public List<ReviewResponse> getAllReviews() {
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
	
	@GetMapping("/home")
	public Map<String, List<LastestReviewResponse>> getHomeData() {
		return Map.of(
				"movies", reviewService.getLastestReview(1),
				"dramas", reviewService.getLastestReview(2),
				"animes", reviewService.getLastestReview(3),
				"books", reviewService.getLastestReview(4)
		);				
	}
	
	@PostMapping
	public ResponseEntity<Long> createReview(@RequestBody @Valid ReviewCreateRequest req) {
		Long id = reviewService.createReview(req);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(id);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteReview(@PathVariable("id") Long id) {
		boolean deleted = reviewService.deleteReview(id);
		
		if (deleted) {
			return ResponseEntity.noContent().build(); // 204 No content
		} else {
			return ResponseEntity.notFound().build(); // 404 Not Found
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateReview(
			@PathVariable("id") Long id,
			@RequestBody ReviewUpdateRequest req) {
		boolean updated = reviewService.updateReview(id, req);
		
		if (updated) {
			return ResponseEntity.noContent().build(); // 204 No content
		} else {
			return ResponseEntity.notFound().build(); // 404 Not Found
		}
	}
}
