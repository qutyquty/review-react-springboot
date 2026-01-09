package com.example.review.dto;

import java.util.List;

import lombok.Data;

@Data
public class MovieDetailResponse {
	
	private Long id;
	private String title;
	private String overview;
	private String release_date;
	private String poster_path;
	private String backdrop_path;
	private Integer runtime;
	private Double vote_average;
	
	private List<Genre> genres;
	private List<Cast> cast;
	
	@Data
	public static class Cast {
		private Long id;
		private String name;
		private String character;
		private String profile_path;
	}
	
	@Data
	public static class Genre {
		private Long id;
		private String name;
	}

}
