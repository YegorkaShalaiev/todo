import React, { useState } from "react";

export default (onSubmit, fields) => {
    const initialValues = {};
    const initialErrors = {};

    fields.map(field => {
        initialValues[field] = '';
        initialErrors[field] = null;
    });

    const [ values, setValues ] = useState({...initialValues});
    const [ fieldErrors, setFieldErrors ] = useState({...initialValues});
    const [ error, setError ] = useState(null);

    const handleInputChange = e => {
        e.persist();
        setValues({...values, [e.target.name]: e.target.value});
        fieldErrors[e.target.name] && setFieldErrors({...fieldErrors, [e.target.name]: null});
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(values).then(data => {
            data.errors && setFieldErrors({...fieldErrors, ...data.errors});
            data.error && setError(data.error);
        });
    }

    return {
        values,
        fieldErrors,
        handleInputChange,
        handleSubmit,
        error
    }

}