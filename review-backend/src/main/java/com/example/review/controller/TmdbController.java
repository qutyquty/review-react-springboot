package com.example.review.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.review.dto.ActorDetailResponse;
import com.example.review.dto.MovieDetailResponse;
import com.example.review.dto.SearchTitleResponse;
import com.example.review.dto.TvDetailResponse;
import com.example.review.service.TmdbService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "*") // 모든 Origin 허용
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tmdb")
public class TmdbController {
	
	private final TmdbService tmdbService;
	
	// 영화 상세 정보 가져오기(영화정보+출연배우리스트)
	@GetMapping("/movie/{id}")
	public Mono<MovieDetailResponse> getMovieDetail(@PathVariable("id") Long id) {
		return tmdbService.getMovieDetail(id);
	}
	
	// 배우 기본 정보 + 출연 영화 목록 + 출연 티비쇼 목록
	@GetMapping("/person/{id}/detail")
	public Mono<ActorDetailResponse> getActorDetailUp(@PathVariable("id") Long id) {
		return tmdbService.getActorDetail(id);
	}
	
	// 영화 상세 정보 가져오기(영화정보+출연배우리스트)
	@GetMapping("/tv/{id}")
	public Mono<TvDetailResponse> getTvDetail(@PathVariable("id") Long id) {
		return tmdbService.getTvDetail(id);
	}
	
	@GetMapping("/multi/search")
	public Mono<SearchTitleResponse> searchTtile(
			@RequestParam("query") String query, 
			@RequestParam("page") int page) {
		return tmdbService.searchTitle(query, page);
	}

}
