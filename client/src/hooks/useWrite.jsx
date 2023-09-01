import { useState } from 'react';
import { checkValidations } from '../utils/checkValidations';

export default function useForm(initialState, validationRules) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (value, fieldName) => {
    setFormData(prevData => ({...prevData, [fieldName]: value}));
    checkValidations(errors, setErrors, validationRules, fieldName, value);
  };
  return [formData, handleInputChange, errors];
}