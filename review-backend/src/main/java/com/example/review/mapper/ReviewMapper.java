package com.example.review.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.review.domain.Review;

@Mapper
public interface ReviewMapper {
	
	Review findById(Long id);
	List<Review> findAll();
	
	List<Review> pagingReviews(@Param("size") int size, @Param("offset") int offset, @Param("categoryId") int categoryId, @Param("keyword") String keyword);
	int countReviews(@Param("categoryId") int categoryId, @Param("keyword") String keyword);

}
