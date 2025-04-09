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

const getMyProducts = (userId) => request.get(`${BASE_URL}/my-products`, { userId })

const create = (productData) => request.post(`${BASE_URL}/create`, productData);

const update = (productId, productData) => request.put(`${BASE_URL}/${productId}/edit`, productData);

const remove = (productId) => request.del(`${BASE_URL}/${productId}/delete`);

const productsApi = {
    getAll,
    getOne,
    getMyProducts,
    create,
    update,
    remove
}

export default productsApi;