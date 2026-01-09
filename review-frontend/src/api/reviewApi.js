const BASE_URL = "http://localhost:8080/api/reviews";

export const getReviews = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("getReviews 실패");
    return response.json();
};

export const getReviewById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("getReviewById 실패");

    const data = await response.json();
    console.log("getReviewById: ", data);
    return data;
};

export const getPagingReviews = async (page = 1, size = 10, categoryId = 1, keyword = "") => {
    const response = await fetch(`${BASE_URL}/paging?page=${page}&size=${size}&categoryId=${categoryId}&keyword=${keyword}`);
    if (!response.ok) throw new Error("getPagingReviews 실패");
    
    const data = await response.json();
    console.log("getPagingReviews: ", data);
    return data;
};
