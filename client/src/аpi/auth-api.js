import * as request from './requester'

const BASE_URL = 'http://localhost:3000/api/users';

const register = (userData) => request.post(`${BASE_URL}/register`, userData);

const login = (userData) => request.post(`${BASE_URL}/login`, userData);

const logout = () => request.post(`${BASE_URL}/logout`);

const update = (userData, userId) => request.put(`${BASE_URL}/${userId}/profile`, userData);

const getUser = (userId) => request.get(`${BASE_URL}/${userId}`);

const userApi = {
    register,
    login,
    logout,
    update,
    getUser,
};

export default userApi;