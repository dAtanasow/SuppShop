import * as request from './requester'

const BASE_URL = 'http://localhost:3000/api/users';

const register = (userData) => request.post(`${BASE_URL}/register`, userData);

const login = (email, password) => request.post(`${BASE_URL}/login`, { email, password });


const userApi = {
    register,
    login
};

export default userApi;