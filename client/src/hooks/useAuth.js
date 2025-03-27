import { useState } from "react";
import userApi from "../аpi/auth-api";

export const useRegister = () => {
    const [error, setError] = useState({});
    const [pending, setPending] = useState(false);

    const registerHandler = async (userData) => {
        setPending(true);
        setError({});

        try {
            await userApi.register(userData);
        } catch (error) {
            setError({ server: error.message });
            return { error: error.message };
        } finally {
            setPending(false);
        }
    }

    return { register: registerHandler, pending, error, setError }
}