import { useEffect, useState } from "react";
import userApi from "../аpi/auth-api";
import { useForm } from "./useForm";
import { useAuthContext } from "../context/AuthContext";


export function useProfileEdit(toggleEditMode) {
    const { email, username, phone, img, userId, changeAuthState } = useAuthContext();

    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        setInitialValues({
            username,
            email,
            phone,
            img,
        });
    }, [email, username, phone, img]);

    const { values, changeHandler, submitHandler, pending } = useForm(
        initialValues,
        async (formData) => {
            const updatedUser = await userApi.update(formData, userId);
            changeAuthState(updatedUser);
            toggleEditMode();
        },
        { reinitializeForm: true }
    );

    return {
        values,
        changeHandler,
        submitHandler,
        pending
    };
}