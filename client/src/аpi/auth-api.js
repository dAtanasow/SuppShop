import * as request from './requester'

const BASE_URL = 'http://localhost:3000/api/users';

const register = (userData) => request.post(`${BASE_URL}/register`, userData);

const login = (email, password) => request.post(`${BASE_URL}/login`, { email, password });

const logout = () => request.post(`${BASE_URL}/logout`);

const update = (userData, userId) => request.put(`${BASE_URL}/${userId}/profile`, userData);

const getUser = (userId) => request.get(`${BASE_URL}/${userId}`);

const getMyProducts = (userId) => request.get(`${BASE_URL}/${userId}/products`)

const checkAvailable = (email, username, phone, userId) => request.get(`${BASE_URL}/check-availability?email=${email}&username=${username}&phone=${phone}&userId=${userId}`)

const userApi = {
    register,
    login,
    logout,
    update,
    getUser,
    getMyProducts,
    checkAvailable
};

export default userApi;