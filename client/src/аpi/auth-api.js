import * as request from './requester'

const BASE_URL = 'http://localhost:3000/api/users';

const register = (email, username, phone, password, rePass) => request.post(`${BASE_URL}/register`, { email, username, phone, password, rePass });

const login = (email, password) => request.post(`${BASE_URL}/login`, { email, password });

const logout = () => request.post(`${BASE_URL}/logout`);

const update = (userData, userId) => request.put(`${BASE_URL}/${userId}/profile`, userData);

const getUser = (userId) => request.get(`${BASE_URL}/${userId}`);

const checkAvailable = (email, username, phone, userId) => {
    const params = new URLSearchParams();
    if (email) params.append("email", email);
    if (username) params.append("username", username);
    if (phone) params.append("phone", phone);
    if (userId && userId !== "null") params.append("userId", userId);

    return request.get(`${BASE_URL}/check-availability?${params.toString()}`);
}

const userApi = {
    register,
    login,
    logout,
    update,
    getUser,
    checkAvailable
};

export default userApi;