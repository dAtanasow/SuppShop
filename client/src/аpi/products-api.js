import * as request from './requester'

const BASE_URL = 'http://localhost:3000/api/catalog';

const getAll = async (category, brand) => {
    const query = new URLSearchParams();
    if (category) {
        query.append('category', category);
    }
    if (brand) {
        query.append('brand', brand);
    }
    const result = await request.get(`${BASE_URL}?${query.toString()}`);
    return result;
}

const getOne = (productId) => request.get(`${BASE_URL}/${productId}`);


const productsApi = {
    getAll,
    getOne
}

export default productsApi;