import * as request from './requester'

const BASE_URL = 'http://localhost:3000/api/reviews';

const getAll = (productId) => request.get(`${BASE_URL}/${productId}`);

const create = (productId, reviewData) => request.post(`${BASE_URL}/${productId}`, reviewData);

const like = (reviewId) => request.post(`${BASE_URL}/${reviewId}/like`);

const dislike = (reviewId) => request.post(`${BASE_URL}/${reviewId}/dislike`);

const getOne = (reviewId) => request.get(`${BASE_URL}/${reviewId}`)

const reviewsApi = {
    getAll,
    create,
    like,
    dislike,
    getOne
};

export default reviewsApi;