import { getAccessToken } from "../utils/authUtils";

export async function requester(method, url, data) {
    const options = {
        method,
        headers: {},
    };

    const accessToken = getAccessToken();
    if (accessToken) {
        options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (method !== "GET" && data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('auth');
            window.location.href = '/login';
            return;
        }

        const contentType = response.headers.get("Content-Type");
        const responseText = await response.text();

        const result = contentType?.includes("application/json")
            ? JSON.parse(responseText)
            : responseText;

        if (!response.ok) {
            throw new Error(result?.message || 'An error occurred');
        }

        if (result?.accessToken) {
            localStorage.setItem('auth', JSON.stringify({ accessToken }));
        }

        return response.status === 204 ? {} : result;
    } catch (error) {
        console.error("API Request Error:", error.message);
        throw error;
    }
}

export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');

export default { get, post, put, del };
