import * as request from './requester'

const BASE_URL = 'http://localhost:3000/api/cart';

const getCart = (userId) => request.get(`${BASE_URL}/${userId}`);

const addToCart = (productId, userId) => request.put(`${BASE_URL}/${userId}`, { productId })

const removeCartItem = (userId, itemId) => request.del(`${BASE_URL}/${userId}/${itemId}`)

const updateCartItemQuantity = (userId, itemId, quantity) => request.put(`${BASE_URL}/${userId}/${itemId}`, { quantity });

const cartApi = {
    getCart,
    addToCart,
    removeCartItem,
    updateCartItemQuantity
}

export default cartApi;