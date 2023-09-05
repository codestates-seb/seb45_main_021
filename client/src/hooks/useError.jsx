import { useState } from 'react';

export default function useError(defaultError,rule) {
    const [error, setError] = useState(defaultError);

    const updateError = (value,name,callback) => {
        if (callback) {
            const updatedError = callback(error, rule, value, name);
            setError(updatedError);
        } else {
            setError((prevError) => ({
                ...prevError,
                [name]: value,
            }));
        }
    }

    const handleErrorChange = (e, value, name, errorChangeFunction) => {
        if(e) {
            const { value, name } = e.target;
            updateError(value,name, errorChangeFunction);
        } else {
            updateError(value,name, errorChangeFunction);
        }
    };

    const removeSpecificError = (name) => {
        const newError = {...error};
        delete newError[name];
        setError(newError);
    }

    return [error, handleErrorChange, removeSpecificError, setError];
}
