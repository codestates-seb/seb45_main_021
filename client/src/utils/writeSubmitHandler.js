import api from '../hooks/useAxiosInterceptor';

const fileHeader = {
    headers : {
        'Content-Type': 'multipart/form-data',
        withCredentials: true
    }
}

const transferToFormData = (obj, willDeletedImgs, type) => {
    const formData = new FormData();
    const jsonData = {};
    for (const key in obj) {
        const value = obj[key];
        if (value instanceof FormData) {
          for (const subValue of value.values()) {
            formData.append(key, subValue);
          }
        } else {
            jsonData[key] = value;
        }
    }
    formData.append(type, JSON.stringify(jsonData));
    if(willDeletedImgs) {
        for(const key in willDeletedImgs) {
            formData.append(key, willDeletedImgs[key]);
        }
    }
    return formData;
}

export const writeSubmitHandler = (obj, error, setError, willDeletedImgs, type) => {
    if(Object.keys(error).length) {
        console.log('에러존재')
        const newError = {...error}
        for(let key in error) {
            newError[key] = true;
        }
        setError(newError);
        window.scrollTo(0,0);
    } else {
        console.log('데이터변환시도');
        const requestForm = transferToFormData(obj, willDeletedImgs, type);
        for(const [subKey,value] of requestForm.entries()) {
            console.log(subKey, value);
        }
    }
}