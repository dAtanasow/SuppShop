import { useState } from "react";
import userApi from "../аpi/auth-api";

export const useRegister = () => {
    const [error, setError] = useState({});
    const [pending, setPending] = useState(false);

    const registerHandler = async (userData) => {
        setPending(true);
        setError({});

        try {
            return await userApi.register(userData);
        } catch (error) {
            setError({ server: error.message });
            return { error: error.message };
        } finally {
            setPending(false);
        }
    }

    return { register: registerHandler, pending, error, setError }
}

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);

    const loginHandler = async (email, password) => {
        if (pending) return;
        setPending(true);
        setError({});

        try {
            return await userApi.login(email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setPending(false);
        }
    };

    return {
        loginHandler,
        error,
        pending,
    };
}