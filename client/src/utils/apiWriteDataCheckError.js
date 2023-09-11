import { projectErrorInitData } from "../static/projectInit"
import { portFolioErrorInitData } from "../static/portFolioInit"

export const apiWriteDataCheckError = (obj,type) => {
    const defaultError = type==='project' ? {...projectErrorInitData} : {...portFolioErrorInitData};
    console.log(defaultError);
    console.log(obj);
    for(let key in defaultError) {
        if(obj[key].length) {
            delete defaultError[key];
        }
    }
    return defaultError;
}
