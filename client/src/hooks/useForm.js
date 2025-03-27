import { useEffect, useState } from "react";

export function useForm(initialValues, submitCallback, options = { reinitializeForm: false }) {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState(null);
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
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (pending) return;
        setPending(true);
        try {
            await submitCallback(values);
            setError(null);
        } catch (error) {
            setError(error)
        } finally {
            setPending(false);
        }
    };

    return {
        values,
        changeHandler,
        submitHandler,
        error,
        pending
    };
}