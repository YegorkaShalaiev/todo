import React, { useState } from "react";

export default (onSubmit, fields) => {
    const initialValues = {};
    const initialErrors = {};

    fields.map(field => {
        initialValues[field] = '';
        initialErrors[field] = null;
    });

    const [ values, setValues ] = useState({...initialValues});
    const [ errors, setErrors ] = useState({...initialValues});

    const handleInputChange = e => {
        e.persist();
        setValues({...values, [e.target.name]: e.target.value});
        errors[e.target.name] && setErrors({...errors, [e.target.name]: null});
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(values).then(data => {
            data.errors && setErrors({...errors, ...data.errors})
        });
    }

    return {
        values,
        errors,
        handleInputChange,
        handleSubmit
    }

}