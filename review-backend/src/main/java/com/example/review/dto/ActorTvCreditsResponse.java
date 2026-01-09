package com.example.review.dto;

import java.util.List;

import lombok.Data;

@Data
public class ActorTvCreditsResponse {

	private List<TvCast> cast;
	private List<TvCrew> crew;
	
	@Data
	public static class TvCast {
		private Long id;
		private String name;
		private String poster_path;
		private String first_air_date;
		private String character;
	}
	
	@Data
	public static class TvCrew {
		private Long id;
		private String name;
		private String poster_path;
		private String first_air_date;
		private String job;
		private String department;
	}
	
}
