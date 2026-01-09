import axios from "axios";

// Axios 기본 인스턴스 생성
const tmdbApi = axios.create({
    baseURL: "http://localhost:8080/api/tmdb",
});

// 영화 상세 조회
export const getMovieDetail = async (movieId) => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        return response.data;
    } catch (error) {
        console.error("getMovieDetail 에러: ", error);
        throw error;
    }
};

// 배우 정보+출연영화+출연티비 목록 조회
export const getActorDetail = async (id) => {
    try {
        const response = await tmdbApi.get(`/person/${id}/detail`);
        return response.data;
    } catch (error) {
        console.error("getActorDetail 에러: ", error);
        throw error;
    }
};

// tv 상세 조회
export const getTvDetail = async (id) => {
    try {
        const response = await tmdbApi.get(`/tv/${id}`);
        return response.data;
    } catch (error) {
        console.error("getTvDetail 에러: ", error);
        throw error;
    }
};