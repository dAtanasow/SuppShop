import { getAccessToken } from "../utils/authUtils";

export async function requester(method, url, data) {

    const options = {
        method,
        headers: {},
    };

    if (method !== "GET") {

        const accessToken = getAccessToken();

        if (!accessToken && !url.includes("/users/login") && !url.includes("/users/register")) {
            throw new Error("No access token found. Please log in.");
        }

        options.headers['Authorization'] = `Bearer ${accessToken}`;

        if (data) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }
    }

    const response = await fetch(url, options);

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('auth');
        window.location.href = '/login';
        return;
    }
    const contentType = response.headers.get("Content-Type");

    const responseText = await response.text();

    let result = {};
    if (contentType && contentType.includes("application/json")) {
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error("Error parsing JSON:", e);
        }
    }
    if (!response.ok) {
        throw new Error(result.message || 'An error occurred');
    }

    if (response.status === 204) return {};

    if (result.accessToken) {
        const authData = JSON.stringify({ accessToken: result.accessToken });
        localStorage.setItem('auth', authData);
    }

    return result;
}
export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');

export default { get, post, put, del };