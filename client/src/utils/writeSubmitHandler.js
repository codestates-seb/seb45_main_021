import api from '../hooks/useAxiosInterceptor';
import { projectWriteInitData } from '../static/projectInit';
import { portfolioWriteInitData } from '../static/portfolioInit';

const formDataHeader = {
    'Content-Type': 'multipart/form-data',
    withCredentials: true,
}

const transferToFormData = (obj, type, memberId, postId) => {
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
        } else {
            jsonData[key] = value;
        }
    }
    if(!postId) {
        jsonData.memberId = memberId
    }
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
    return new Promise((resolve,reject)=>{
        if(Object.keys(error).length) {
            const newError = {...error}
            for(let key in error) {
                newError[key] = true;
            }
            setError(newError);
            window.scrollTo(0,0);
            return reject('formError')
        } else {
            const requestForm = transferToFormData(obj, type, memberId, postId);
            // for(const [subKey,value] of requestForm.entries()) {
            //     console.log(subKey, value);
            // }
            if(postId) {
                api.patch(`/${type}s/${postId}`,requestForm, {
                    headers:formDataHeader,
                })
                .then(res=>{
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
                api.post(`/${type}s`,requestForm, {
                    headers:formDataHeader,
                })
                .then((res)=>{
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