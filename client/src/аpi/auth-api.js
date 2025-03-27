import * as request from './requester'

const BASE_URL = 'http://localhost:3000/api/users';

const register = (userData) => request.post(`${BASE_URL}/register`, userData);

const login = (userData) => request.post(`${BASE_URL}/login`, userData);


const userApi = {
    register,
    login
};

export default userApi;