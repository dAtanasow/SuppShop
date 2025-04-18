import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import userApi from "../аpi/auth-api";
import { useCallback, useState } from "react";

export const useRegister = () => {
    const { changeAuthState, userId } = useAuthContext()
    const [errors, setError] = useState({});
    const [pending, setPending] = useState(false);

    const registerHandler = async (email, username, phone, password, rePass) => {

        email = email.trim();
        username = username.trim();
        phone = phone.trim();
        password = password.trim();
        rePass = rePass.trim();

        setPending(true);
        setError({});

        const isDataAvailable = await checkIsDataAvailable(email, username, phone);
        if (!isDataAvailable) {
            setPending(false);
            return;
        }

        try {
            const authData = await userApi.register(email, username, phone, password, rePass);
            changeAuthState(authData);
            return authData;
        } catch (error) {
            setError({ server: error.message });
            return { error: error.message };
        } finally {
            setPending(false);
        }
    }

    const validateForm = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email format.";
        }

        if (!values.username) {
            errors.username = "Username is required.";
        } else if (values.username.length < 5) {
            errors.username = "Username should be at least 5 characters.";
        }

        if (values.phone && !/^08\d{8}$/.test(values.phone)) {
            errors.phone = "Phone must start with 08 and contain 10 digits.";
        }

        if (!values.password) {
            errors.password = "Password is required.";
        } else if (values.password.length < 5) {
            errors.password = "Password should be at least 5 characters.";
        } else if (values.password !== values.rePass) {
            errors.rePass = "Passwords do not match.";
        }

        return errors;
    };

    const checkIsDataAvailable = async (email, username, phone) => {
        if (!email || !username || !phone) {
            console.log("Missing required fields");
            return;
        }
        try {
            const data = await userApi.checkAvailable(email, username, phone, userId);

            if (data.emailTaken || data.usernameTaken || data.phoneTaken) {
                setError({
                    email: data.emailTaken ? "Email is already taken." : "",
                    username: data.usernameTaken ? "Username is already taken." : "",
                    phone: data.phoneTaken ? "Phone already taken" : ""
                });
                return false;
            }
            return true;
        } catch (err) {
            setError({
                server:
                    "Server error. Please check your connection or try again later.",
            });
            console.log(err.message);

            return false;
        }
    };

    return {
        register: registerHandler,
        validateForm,
        checkIsDataAvailable,
        setError,
        pending,
        errors,
    };
}

export const useLogin = () => {
    const { changeAuthState } = useAuthContext();
    const [errors, setError] = useState(null);
    const [pending, setPending] = useState(false);

    const validateForm = useCallback((email, password) => {
        const validationErrors = {};

        if (!email) {
            validationErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = "Invalid email format.";
        }

        if (!password) {
            validationErrors.password = "Password is required.";
        }

        return validationErrors;
    }, []);

    const loginHandler = useCallback(async (email, password) => {
        if (pending) return;
        setPending(true);
        setError({});

        email = email.trim();
        password = password.trim();

        const validationErrors = validateForm(email, password);
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            setPending(false);
            return;
        }
        try {
            const authData = await userApi.login(email, password);
            changeAuthState(authData);
            return authData;
        } catch (err) {
            if (err.message === 'User not found. Please check your email.') {
                setError({ general: 'User not found. Please check your email.' });
            } else if (err.message === 'Incorrect password.') {
                setError({ general: 'Incorrect password. Please try again.' });
            } else {
                setError({ general: err.message || 'Something went wrong during login.' });
            }

        } finally {
            setPending(false);
        }
    }, [pending, validateForm, changeAuthState]);

    return {
        login: loginHandler,
        errors,
        pending,
    };
};

export const useLogout = () => {
    const navigate = useNavigate();

    const { logout: localLogout, accessToken } = useAuthContext()
    const logoutHandler = async () => {
        if (!accessToken) {
            console.log("No active session detected.");
            localLogout();
            navigate("/");
            return;
        }

        try {
            await userApi.logout();
            localLogout();
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    return logoutHandler;
}