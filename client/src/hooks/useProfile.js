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
        return newErrors;
    };

    const checkIfEmailOrUsernameTaken = async (email, username, phone) => {
        try {
            const data = await userApi.checkAvailable(email, username, phone, userId);

            const availabilityErrors = {};
            if (data.emailTaken) availabilityErrors.email = "Email is already taken.";
            if (data.usernameTaken) availabilityErrors.username = "Username is already taken.";
            if (data.phoneTaken) availabilityErrors.phone = "Phone is already taken.";

            if (Object.keys(availabilityErrors).length > 0) {
                setError((prev) => ({ ...prev, ...availabilityErrors }));
                return false;
            }

            return true;
        } catch (err) {
            setError((prev) => ({
                ...prev,
                general: "Server error. Please check your connection or try again later.",
            }));
            console.log("Error checking availability:", err.message);
            return false;
        }
    };

    const trimStringValues = (obj) =>
        Object.fromEntries(
            Object.entries(obj).map(([key, value]) =>
                typeof value === "string" ? [key, value.trim()] : [key, value]
            )
        );

    const { values, changeHandler, submitHandler, pending } = useForm(
        initialValues,
        async (formData) => {
            const trimmedData = trimStringValues(formData);

            const formErrors = validateForm(trimmedData);
            if (Object.keys(formErrors).length > 0) return;

            const hasChanges = Object.keys(initialValues).some(
                (key) => trimmedData[key] !== initialValues[key].trim()
            );

            if (!hasChanges) {
                console.log("No changes detected. Skipping update request.");
                toggleEditMode();
                return;
            }

            const available = await checkIfEmailOrUsernameTaken(
                trimmedData.email,
                trimmedData.username,
                trimmedData.phone
              );

            if (!available) return;

            const updatedUser = await userApi.update(trimmedData, userId);
            changeAuthState(updatedUser);
            toggleEditMode();
        },
        { reinitializeForm: true }
    );

    const handleChange = async (e) => {
        changeHandler(e);
        setError((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    return {
        values,
        changeHandler: handleChange,
        submitHandler,
        pending,
        errors,
    };
}