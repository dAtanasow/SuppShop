import { useEffect, useState } from "react";

export function useForm(initialValues, submitCallback, options = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (options.reinitializeForm) {
            setValues(initialValues);
        }
    }, [initialValues, options.reinitializeForm]);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));

        if (errors[e.target.name]) {
            setErrors((state) => ({
                ...state,
                [e.target.name]: undefined,
            }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (pending) return;

        setPending(true);

        try {
            await submitCallback(values);
            setErrors({});
        } catch (error) {
            setErrors(error);
        } finally {
            setPending(false);
        }
    };

    return {
        values,
        setValues,
        changeHandler,
        submitHandler,
        errors,
        pending,
    };
}