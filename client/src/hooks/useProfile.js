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
            username: username || "",
            email: email || "",
            phone: phone || "",
            img: img || "",
        });
    }, [email, username, phone, img]);

    const validateForm = (values) => {
        const newErrors = {};

        if (!values.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!values.username) {
            newErrors.username = "Username is required.";
        } else if (values.username.length < 5) {
            newErrors.username = "Username should be at least 5 characters.";
        }

        if (!values.phone) {
            newErrors.phone = "Phone is required.";
        } else if (!/^08\d{8}$/.test(values.phone)) {
            newErrors.phone = "Phone must start with 08 and contain 10 digits.";
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkIfEmailOrUsernameTaken = async (email, username, phone) => {
        try {
            const data = await userApi.checkAvailable(email, username, phone, userId);

            if (data.emailTaken || data.usernameTaken || data.phoneTaken) {
                setError((prev) => ({
                    ...prev,
                    email: data.emailTaken ? "Email is already taken." : "",
                    username: data.usernameTaken ? "Username is already taken." : "",
                    phone: data.phoneTaken ? "Phone is already taken." : "",
                }));
                return false;
            }
            return true;
        } catch (err) {
            setError((prev) => ({
                ...prev,
                server: "Server error. Please check your connection or try again later.",
            }));
            console.log("Error checking availability:", err.message);
            return false;
        }
    };

    const { values, changeHandler, submitHandler, pending } = useForm(
        initialValues,
        async (formData) => {
            if (!validateForm(formData)) return;

            const trimmedFormData = Object.fromEntries(
                Object.entries(formData).map(([key, value]) =>
                    typeof value === "string" ? [key, value.trim()] : [key, value]
                )
            );

            const hasChanges = Object.keys(initialValues).some(
                (key) => trimmedFormData[key] !== initialValues[key].trim()
            );

            if (!hasChanges) {
                console.log("No changes detected. Skipping update request.");
                toggleEditMode();
                return;
            }

            const isAvailable = await checkIfEmailOrUsernameTaken(
                trimmedFormData.email,
                trimmedFormData.username,
                trimmedFormData.phone
            );

            if (!isAvailable) return;

            const updatedUser = await userApi.update(trimmedFormData, userId);
            changeAuthState(updatedUser);
            toggleEditMode();
        },
        { reinitializeForm: true }
    );

    const handleChange = async (e) => {
        changeHandler(e);
        setError((prev) => ({ ...prev, [e.target.name]: "" }));
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