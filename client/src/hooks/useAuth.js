import { useState } from "react";
import userApi from "../аpi/auth-api";
import { useForm } from "./useForm";

export const useRegister = () => {
    const { values, setValues, changeHandler, setError, setPending, pending, errors } = useForm(
        {
            email: "",
            username: "",
            phone: "",
            password: "",
            rePass: "",
        }
    );

    const registerHandler = async () => {
        setPending(true);
        setError({});

        try {
            await userApi.register(values);
            setValues({});
        } catch (error) {
            if (error.message === "Email is already registered!") {
                setError({ email: "This email is already in use." });
            } else if (typeof error === 'object') {
                setError(error);
            } else {
                setError({ general: error.message });
            }
        } finally {
            setPending(false);
        }
    }

    return { register: registerHandler, changeHandler, pending, errors, values, setValues };
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