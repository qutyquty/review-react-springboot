package com.example.review.dto;

import java.util.List;

import lombok.Data;

@Data
public class ActorMovieCreditsResponse {

	private List<MovieCast> cast;
	private List<MovieCrew> crew;
	
	@Data
	public static class MovieCast {
		private Long id;
		private String title;
		private String poster_path;
		private String release_date;
		private String character; // 배우가 맡은 역할
	}
	
	@Data
	public static class MovieCrew {
		private Long id;
		private String title;
		private String poster_path;
		private String release_date;
		private String job;
		private String department;
	}
	
}
