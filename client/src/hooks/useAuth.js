import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import userApi from "../аpi/auth-api";
import { useForm } from "./useForm";
import { useCallback } from "react";

export const useRegister = () => {
    const { values, changeHandler, setError, setPending, pending, errors } = useForm(
        {
            email: "",
            username: "",
            phone: "",
            password: "",
            rePass: "",
        }
    );

    const { changeAuthState } = useAuthContext()

    const registerHandler = async () => {
        setPending(true);
        setError({});

        try {
            const authData = await userApi.register(values);
            changeAuthState(authData);
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

    return { register: registerHandler, values, changeHandler, pending, errors };
}

export const useLogin = () => {
    const { values, changeHandler, setError, setPending, pending, errors } = useForm(
        {
            email: "",
            password: "",
        }
    );
    const { changeAuthState } = useAuthContext()

    const loginHandler = async () => {
        if (pending) return;
        setPending(true);
        setError({});

        try {
            const authData = await userApi.login(values);
            changeAuthState(authData);
        } catch (err) {
            setError(err.message);
        } finally {
            setPending(false);
        }
    };

    return {
        login: loginHandler,
        changeHandler,
        errors,
        pending,
    };
}

export const useLogout = () => {
    const { logout: localLogout } = useAuthContext();
    const navigate = useNavigate();

    return useCallback(async () => {
        await userApi.logout();
        localLogout();
        navigate("/");
    }, [localLogout, navigate]);
};
