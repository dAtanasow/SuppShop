import { useEffect, useState } from "react";
import userApi from "../аpi/auth-api";
import { useForm } from "./useForm";
import { useAuthContext } from "../context/AuthContext";


export function useProfileEdit(toggleEditMode) {
    const { email, username, phone, img, userId, changeAuthState } = useAuthContext();
    const [initialValues, setInitialValues] = useState({});
    const [errors, setError] = useState({});

    useEffect(() => {
        setInitialValues({
            username,
            email,
            phone,
            img,
        });
    }, [email, username, phone, img]);

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

        if (!values.phone) {
            errors.phone = "Phone is required.";
        }

        if (values.phone && !/^08\d{8}$/.test(values.phone)) {
            errors.phone = "Phone must start with 08 and contain 10 digits.";
        }
        return errors;
    };

    const checkIfEmailOrUsernameTaken = async (email, username, phone) => {
        try {
            const data = await userApi.checkAvailable(email, username, phone, userId);

            if (data.emailTaken || data.usernameTaken || data.phoneTaken) {
                setError({
                    email: data.emailTaken ? "Email is already taken." : "",
                    username: data.usernameTaken ? "Username is already taken." : "",
                    phone: data.phoneTaken ? "Phone is already taken." : ""
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

    const { values, changeHandler, submitHandler, pending } = useForm(
        initialValues,
        async (formData) => {
            if (!validateForm(formData)) return;

            const updatedUser = await userApi.update(formData, userId);
            changeAuthState(updatedUser);
            toggleEditMode();
        },
        { reinitializeForm: true }
    );

    const handleChange = async (e) => {
        changeHandler(e);
        validateForm({ ...values, [e.target.name]: e.target.value });
    };

    return {
        changeHandler: handleChange,
        checkIfEmailOrUsernameTaken,
        submitHandler,
        setError,
        validateForm,
        values,
        pending,
        errors,
    };
}