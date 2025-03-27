import * as request from '../api/requester'

const BASE_URL = 'http://localhost:3000/api/users';

const register = (email, username, phone, password, rePass) => request.post(`${BASE_URL}/register`, { email, username, phone, password, rePass });

const login = (email, password) => request.post(`${BASE_URL}/login`, { email, password });


const userApi = {
    register,
    login
};

export default userApi;