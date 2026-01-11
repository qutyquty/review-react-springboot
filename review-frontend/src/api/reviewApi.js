const BASE_URL = "http://localhost:8080/api/reviews";

export const getReviews = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("getReviews 에러");
    return response.json();
};

export const getReviewById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("getReviewById 에러");

    const data = await response.json();
    console.log("getReviewById: ", data);
    return data;
};

export const getPagingReviews = async (page = 1, size = 10, categoryId = 1, keyword = "") => {
    const response = await fetch(`${BASE_URL}/paging?page=${page}&size=${size}&categoryId=${categoryId}&keyword=${keyword}`);
    if (!response.ok) throw new Error("getPagingReviews 에러");
    
    const data = await response.json();
    console.log("getPagingReviews: ", data);
    return data;
};

export const getLastestReview = async () => {
    const response = await fetch(BASE_URL+"/home");
    if (!response.ok) throw new Error("getLastestReview 에러");
    return response.json();
};

export const saveReview = async (selectedMT, review, firstYear) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tmdbId: selectedMT?.id,
                posterPath: selectedMT?.poster_path,
                title: review.title,
                content: review.content,
                categoryId: review.categoryId,
                firstYear: firstYear,
            }),
        });

        if (!response.ok) {
            throw new Error("리뷰 저장 실패");
        }

        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteReview = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) throw new Error("deleteReview 에러");
    
    return response;
};

export const updateReview = async (id, selectedMovie, review, firstYear) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tmdbId: selectedMovie?.id,
            posterPath: selectedMovie?.poster_path,
            title: review.title,
            content: review.content,
            categoryId: review.categoryId,
            firstYear: firstYear,
        }),
    });

    if (!response.ok) throw new Error("updateReview 에러");
    
    return response;
};