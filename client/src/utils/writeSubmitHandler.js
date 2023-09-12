import api from '../hooks/useAxiosInterceptor';
import { projectWriteInitData } from '../static/projectInit';
import { portFolioWriteInitData } from '../static/portFolioInit';

const transferToFormData = (obj, type) => {
    const formData = new FormData();
    const jsonData = {};
    const standardInitData = type === 'project' ? projectWriteInitData : portFolioWriteInitData;
    for (const key in standardInitData) {
        const value = obj[key];
        if (value instanceof FormData) {
            for (const subValue of value.values()) {
                formData.append(key, subValue);
            }
        } else if (key === 'titleImageUrl'){
            formData.append(key, obj[key]);
        } else if (key === 'imageUrls') {
            formData.append(key, JSON.stringify(obj[key]));
        } else {
            jsonData[key] = value;
        }
    }
    formData.append(type, JSON.stringify(jsonData));
    return formData;
}

export const writeSubmitHandler = (obj, error, setError, type) => {
    if(Object.keys(error).length) {
        console.log('에러존재')
        const newError = {...error}
        for(let key in error) {
            newError[key] = true;
        }
        setError(newError);
        window.scrollTo(0,0);
    } else {
        const requestForm = transferToFormData(obj, type);
        for(const [subKey,value] of requestForm.entries()) {
            console.log(subKey, value);
        }
    }
}

// import api from '../hooks/useAxiosInterceptor';
// import { projectWriteInitData } from '../static/projectInit';

// const transferToFormData = (obj, willDeletedImgs, type) => {
//     const formData = new FormData();
//     const jsonData = {};
//     for (const key in projectWriteInitData) {
//         const value = obj[key];
//         if (value instanceof FormData) {
//             for (const subValue of value.values()) {
//                 formData.append(key, subValue);
//             }
//         } else if (key !== 'titleImageFile' || key !== 'imageFile'){
//             jsonData[key] = value;
//         }
//     }
//     formData.append(type, JSON.stringify(jsonData));
//     return [formData,willDeletedImgs];
// }

// export const writeSubmitHandler = (obj, error, setError, willDeletedImgs, type) => {
//     if(Object.keys(error).length) {
//         console.log('에러존재')
//         const newError = {...error}
//         for(let key in error) {
//             newError[key] = true;
//         }
//         setError(newError);
//         window.scrollTo(0,0);
//     } else {
//         const [requestForm,deleteJsonData] = transferToFormData(obj, willDeletedImgs, type);
//         for(const [subKey,value] of requestForm.entries()) {
//             console.log(subKey, value);
//         }
//         console.log(deleteJsonData);
//     }
// }