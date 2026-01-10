package com.example.review.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class LastestReviewResponse {
	
	private String title;
	private LocalDateTime createdTime;
	private Long id;
	private Long tmdbId;
	private int categoryId;

}
