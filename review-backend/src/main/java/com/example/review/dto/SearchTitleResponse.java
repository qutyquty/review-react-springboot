package com.example.review.dto;

import java.util.List;

import lombok.Data;

@Data
public class SearchTitleResponse {
	
	private int page;
    private List<Result> results;
    private int total_pages;
    private int total_results;

    // 내부 클래스: 검색 결과 항목
    @Data
    public static class Result {
        private int id;
        private String media_type;   // "movie", "tv", "person"
        private String title;        // 영화 제목
        private String name;         // TV/인물 이름
        private String overview;     // 설명
        private String poster_path;  // 포스터 이미지 경로
        private String profile_path; // 인물 프로필 이미지 경로
        private String release_date; // 영화 개봉일
        private String first_air_date; // TV 첫 방영일
    }

}
