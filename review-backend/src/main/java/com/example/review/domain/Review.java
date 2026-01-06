package com.example.review.domain;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Review {
	
	private Long id;
	private String title;
	private String content;
	private String posterPath;
	private String firstYear;
	private int categoryId;
	private Long tmdbId;
	private LocalDateTime createdTime;
	private LocalDateTime updatedTime;

}
