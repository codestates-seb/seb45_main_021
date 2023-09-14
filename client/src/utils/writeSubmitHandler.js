import api from '../hooks/useAxiosInterceptor';
import { projectWriteInitData } from '../static/projectInit';
import { portfolioWriteInitData } from '../static/portfolioInit';

const formDataHeader = {
    'Content-Type': 'multipart/form-data',
    withCredentials: true,
}

const transferToFormData = (obj, type, memberId) => {
    console.log(obj)
    const formData = new FormData();
    const jsonData = {};
    const standardInitData = type === 'project' ? projectWriteInitData : portfolioWriteInitData;
    for (const key in standardInitData) {
        const value = obj[key];
        if (value instanceof FormData) {
            for (const subValue of value.values()) {
                formData.append(key, subValue);
            }
        } else if (key === 'titleImageUrl'){
            if(obj[key].length !== 0) {
                formData.append(key, obj[key]);
            }
        } else if (key === 'imageUrls') {
            if(obj[key].length !== 0 ) {
                for(let i = 0; i < obj[key].length; i++){
                    formData.append(key, obj[key][i]);    
                }
            }
            // formData.append(key, obj[key]);
        } else {
            jsonData[key] = value;
        }
    }
    jsonData.memberId = memberId;
    let tempStr = '';
    if(obj.tags.length) {
        for(let i = 0; i < obj.tags.length; i++ ){
            tempStr+=obj.tags[i];
            if(i !== obj.tags.length-1) {
                tempStr+=',';
            }
        }
        jsonData.tags = tempStr;
    } else {
        jsonData.tags = "";
    }
    
    formData.append(type, JSON.stringify(jsonData));
    return formData;
}

export const writeSubmitHandler = (obj, error, setError, type, memberId, postId) => {
    console.log(`포스트아이디 ${postId}`)
    return new Promise((resolve,reject)=>{
        if(Object.keys(error).length) {
            console.log('에러존재')
            const newError = {...error}
            for(let key in error) {
                newError[key] = true;
            }
            setError(newError);
            window.scrollTo(0,0);
            return reject('formError')
        } else {
            const requestForm = transferToFormData(obj, type, memberId);
            for(const [subKey,value] of requestForm.entries()) {
                console.log(subKey, value);
            }
            if(postId) {
                console.log('패치요청')
                api.patch(`/${type}s/${postId}`,requestForm, {
                    headers:formDataHeader,
                })
                .then(res=>{
                    console.log('수정성공');
                    return resolve();
                })
                .catch((error) => {
                    if (error.response) {
                      console.log('서버 응답 오류:', error.response.status, error.response.data);
                    } else if (error.request) {
                      console.log('요청 오류:', error.request);
                    } else {
                      console.log('일반 오류:', error.message);
                    }
                    return reject();
                });
            } else {
                console.log('포스트요청')
                api.post(`/${type}s`,requestForm, {
                    headers:formDataHeader,
                })
                .then((res)=>{
                    console.log('작성성공');
                    return resolve();
                })
                .catch((error) => {
                    if (error.response) {
                      console.log('서버 응답 오류:', error.response.status, error.response.data);
                    } else if (error.request) {
                      console.log('요청 오류:', error.request);
                    } else {
                      console.log('일반 오류:', error.message);
                    }
                    return reject();
                  });
            }
        }
    })
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