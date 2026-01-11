package com.example.review.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReviewCreateRequest {
	
	private Long id;
	
	private Long tmdbId;
	
	@NotBlank
	private String title;
	
	@NotBlank	
	private String content;
	
	private int categoryId;
	private String posterPath;
	private String firstYear;

}
