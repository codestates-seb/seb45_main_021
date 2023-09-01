export const checkValidations = (errors, setErrors, validationRules, fieldName, value) => {
    if (validationRules[fieldName]) {
        if(validationRules[fieldName].min === validationRules[fieldName].max) {
            if (value.length < validationRules[fieldName].min) {
                setErrors(prevErrors => ({ ...prevErrors, [fieldName]: `최소 ${validationRules[fieldName].min} 개 이상 선택 해주세요.`}));
                } else {
                const newErrors = {...errors};
                delete newErrors[fieldName];
                setErrors({...newErrors});
            }
        } else {
            if (value.length > validationRules[fieldName].max || value.length < validationRules[fieldName].min) {
                setErrors(prevErrors => ({ ...prevErrors, [fieldName]: `최소 ${validationRules[fieldName].min} 최대 ${validationRules[fieldName].max} 글자까지 입력 가능합니다.`}));
                } else {
                const newErrors = {...errors};
                delete newErrors[fieldName];
                setErrors({...newErrors});
            }
        }
    }
}
