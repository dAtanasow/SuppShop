import { useState } from "react";
import userApi from "../аpi/auth-api";

export const useRegister = () => {
    const [error, setError] = useState({});
    const [pending, setPending] = useState(false);

    const registerHandler = async (email, username, phone, password, rePass) => {
        setPending(true);
        setError({});

        try {
            await userApi.register(email, username, phone, password, rePass);
        } catch (error) {
            setError({ server: error.message });
            return { error: error.message };
        } finally {
            setPending(false);
        }
    }

    return { register: registerHandler, pending, error }
}