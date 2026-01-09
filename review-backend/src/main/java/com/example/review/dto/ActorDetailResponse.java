package com.example.review.dto;

import java.util.List;

import lombok.Data;

@Data
public class ActorDetailResponse {

	private Actor actor;
	private List<MovieSummary> movies;
	private List<TvSummary> tvShows;
	
	@Data
	public static class Actor {
		private Long id;
		private String name;
		private String profile_path;
		private String birthday;
		private String place_of_birth;
		private String biography;
	}
	
	@Data
	public static class MovieSummary {
		private Long id;
		private String title;
		private String poster_path;
		private String release_date;
		private String character;
	}
	
	@Data
	public static class TvSummary {
		private Long id;
		private String name;
		private String poster_path;
		private String first_air_date;
		private String character;
	}
	
}
