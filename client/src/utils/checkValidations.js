export const checkValidations = (errors, rule, value, fieldName) => {
    if (rule[fieldName]) {
        if(rule[fieldName].min === rule[fieldName].max) {
            if (value.length < rule[fieldName].min) {
                return {...errors, [fieldName]: true }
                } else {
                const newErrors = {...errors};
                delete newErrors[fieldName];
                return newErrors;
            }
        } else {
            if (value.length > rule[fieldName].max || value.length < rule[fieldName].min) {
                return {...errors, [fieldName]: true }
                } else {
                const newErrors = {...errors};
                delete newErrors[fieldName];
                return newErrors;
            }
        }
    }
}
