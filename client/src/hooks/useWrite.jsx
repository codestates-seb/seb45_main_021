import { useState } from 'react';

export default function useForm(initialState, validationRules) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (value, fieldName) => {
    setFormData(prevData => ({...prevData, [fieldName]: value}));
    if (validationRules[fieldName]) {
      if (value.length > validationRules[fieldName].max || value.length < validationRules[fieldName].min) {
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: `최소 ${validationRules[fieldName].min} 최대 ${validationRules[fieldName].max} 글자까지 입력 가능합니다.`}));
      } else {
        const newErrors = {...errors};
        delete newErrors[fieldName];
        setErrors({...newErrors});
      }
    }
  };
  return [formData, handleInputChange, errors];
}