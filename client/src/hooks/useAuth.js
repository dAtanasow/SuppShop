import { useAuthContext } from "../context/AuthContext";
import userApi from "../аpi/auth-api";
import { useForm } from "./useForm";

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

    return { register: registerHandler, changeHandler, pending, errors };
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