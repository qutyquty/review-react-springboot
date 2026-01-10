package com.example.review.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.review.dto.LastestReviewResponse;
import com.example.review.dto.ReviewCreateRequest;
import com.example.review.dto.ReviewResponse;

@Mapper
public interface ReviewMapper {
	
	ReviewResponse findById(Long id);
	List<ReviewResponse> findAll();
	
	List<ReviewResponse> pagingReviews(@Param("size") int size, @Param("offset") int offset, @Param("categoryId") int categoryId, @Param("keyword") String keyword);
	int countReviews(@Param("categoryId") int categoryId, @Param("keyword") String keyword);
	
	List<LastestReviewResponse> findLastestReview(int categoryId);
	
	int insert(@Param("req") ReviewCreateRequest req);

}
