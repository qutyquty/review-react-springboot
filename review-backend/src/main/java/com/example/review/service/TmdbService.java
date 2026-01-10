package com.example.review.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.review.dto.ActorDetailResponse;
import com.example.review.dto.ActorMovieCreditsResponse;
import com.example.review.dto.ActorTvCreditsResponse;
import com.example.review.dto.MovieDetailResponse;
import com.example.review.dto.SearchTitleResponse;
import com.example.review.dto.TvDetailResponse;

import reactor.core.publisher.Mono;

@Service
public class TmdbService {
	
	private final WebClient webClient;
	
	private final String baseUrl = "https://api.themoviedb.org/3";

	@Value("${tmdb.api.key}")
	private String apiKey;
	
	public TmdbService(WebClient.Builder builder) {
		this.webClient = builder
				.baseUrl(baseUrl)
				.codecs(configurer ->
					configurer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024)
				)
				.build();
	}
	
	// 영화 상세 정보 가져오기(영화정보+출연배우리스트)
	public Mono<MovieDetailResponse> getMovieDetail(Long movieId) {
		// 영화 상세정보 호출
		Mono<MovieDetailResponse> detailMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/movie/{id}")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(movieId))
				.retrieve()
				.bodyToMono(MovieDetailResponse.class);
		
		// 출연배우 정보 호출
		// 넘어오는 형식: { id: ..., cast: {...}, crew: {...} }
		Mono<MovieDetailResponse> creditsMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/movie/{id}/credits")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(movieId))
				.retrieve()
				.bodyToMono(MovieDetailResponse.class); // cast 배열에 자동 매핑
		
		return Mono.zip(detailMono, creditsMono)
				.map(tuple -> {
					MovieDetailResponse detail = tuple.getT1();
					MovieDetailResponse credits = tuple.getT2();
					detail.setCast(credits.getCast()); // cast 리스트를 합침
					return detail;
				});
	}
	
	// 배우 기본 정보 + 출연 영화 목록 + 출연 티비쇼 목록
	public Mono<ActorDetailResponse> getActorDetail(Long actorId) {
		// 배우 기본 정보
		Mono<ActorDetailResponse.Actor> actorMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/person/{id}")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(actorId))
				.retrieve()
				.bodyToMono(ActorDetailResponse.Actor.class);
		
		// 출연 영화 목록
		Mono<ActorMovieCreditsResponse> moviesMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/person/{id}/movie_credits")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(actorId))
				.retrieve()
				.bodyToMono(ActorMovieCreditsResponse.class);
		
		// 출연 티비쇼 목록
		Mono<ActorTvCreditsResponse> tvMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/person/{id}/tv_credits")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(actorId))
				.retrieve()
				.bodyToMono(ActorTvCreditsResponse.class);
		
		// 세 API 결과 합치기
		return Mono.zip(actorMono, moviesMono, tvMono)
				.map(tuple -> {
					ActorDetailResponse.Actor actor = tuple.getT1();
					ActorMovieCreditsResponse movieCredits = tuple.getT2();
					ActorTvCreditsResponse tvCredits = tuple.getT3();
					
					// 영화 최신순 정렬
					List<ActorDetailResponse.MovieSummary> sortedMovies = movieCredits.getCast().stream()
							.filter(m -> m.getRelease_date() != null && !m.getRelease_date().isEmpty())
							.sorted((m1, m2) -> m2.getRelease_date().compareTo(m1.getRelease_date()))
							.map(m -> {
								ActorDetailResponse.MovieSummary dto = new ActorDetailResponse.MovieSummary();
								dto.setId(m.getId());
								dto.setTitle(m.getTitle());
								dto.setPoster_path(m.getPoster_path());
								dto.setRelease_date(m.getRelease_date());
								dto.setCharacter(m.getCharacter());
								return dto;
							})
							.collect(Collectors.toList());
					
					// TV 최신순 정렬
					List<ActorDetailResponse.TvSummary> sortedTv = tvCredits.getCast().stream()
							.filter(m -> m.getFirst_air_date() != null && !m.getFirst_air_date().isEmpty())
							.sorted((m1, m2) -> m2.getFirst_air_date().compareTo(m1.getFirst_air_date()))
							.map(t -> {
								ActorDetailResponse.TvSummary dto = new ActorDetailResponse.TvSummary();
								dto.setId(t.getId());
								dto.setName(t.getName());
								dto.setPoster_path(t.getPoster_path());
								dto.setFirst_air_date(t.getFirst_air_date());
								dto.setCharacter(t.getCharacter());
								return dto;
							})
							.collect(Collectors.toList());
					
					ActorDetailResponse response = new ActorDetailResponse();
					response.setActor(actor);
					response.setMovies(sortedMovies);
					response.setTvShows(sortedTv);
					return response;
				});
	}
	
	// tv 상세 정보 가져오기(tv정보+출연배우리스트)
	public Mono<TvDetailResponse> getTvDetail(Long tvId) {
		// TV 상세 정보 호출
		Mono<TvDetailResponse> detailMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/tv/{id}")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(tvId))
				.retrieve()
				.bodyToMono(TvDetailResponse.class);
		
		// 출연배우 정보 호출
		// 넘어오는 형식: { id: ..., cast: {...}, crew: {...} }
		Mono<TvDetailResponse> creditsMono = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/tv/{id}/credits")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.build(tvId))
				.retrieve()
				.bodyToMono(TvDetailResponse.class); // cast 배열에 자동 매핑
		
		return Mono.zip(detailMono, creditsMono)
				.map(tuple -> {
					TvDetailResponse detail = tuple.getT1();
					TvDetailResponse credits = tuple.getT2();
					detail.setCast(credits.getCast()); // cast 리스트를 합침
					return detail;
				});
	}
	
	// 영화+tv 제목 검색
	public Mono<SearchTitleResponse> searchTitle(String query) {
		return webClient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/search/multi")
						.queryParam("api_key", apiKey)
						.queryParam("language", "ko-KR")
						.queryParam("query", query)
						.build())
				.retrieve()
				.bodyToMono(SearchTitleResponse.class);
	}
}
