import base64 from 'base-64'
import axios from 'axios'
import {Navigate} from 'react-router-dom'

/*토큰의 payload해독*/
const exampleToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlcklkIjoyMTIsInN1YiI6ImNrc2sxMjAwM0BnbWFpbC5jb20xIiwiaWF0IjoxNjkzMjgyMTU5LCJleHAiOjE2OTMyODkzNTl9.z7DNHGaMZZ_aAmq9j720eIeqjFlkSm53S2VBzAg5Qro";
export const checkToken = (key="access_token") => {
    try {
        const ACCESS_TOKEN = localStorage.getItem(key);
        const payload = ACCESS_TOKEN.split(' ')[1].split('.')[1];
        const decode = JSON.parse(base64.decode(payload));
        return decode;
    } catch {
        return false;
    }
}


/*커스텀 axios 인터셉터 사용하기*/
const api = axios.create();
api.interceptors.response.use(
    function (res) {
      if (res.headers.accesstoken) {
        const accessToken = JSON.stringify(res.headers.accesstoken);
        localStorage.setItem("accessToken", accessToken);
      }
      if (res.headers.refreshtoken) {
        const refreshToken = JSON.stringify(res.headers.refreshtoken);
        localStorage.setItem("refreshToken", refreshToken);
      }
      console.log("res", res);
      return res;
    },
    function (err) {
      console.log("err", err);
      if (err.response.data.message === "Time Out") {
        window.dispatchEvent(new Event("logoutEvent"));
        return;
      }
      return Promise.reject(err);
    }
  );


/*경로 보호*/
export default function ProtectRoute({needLogin,needUnLogin,children,key="access_token"}) {
    const deCodingToken = checkToken(key);
    if((needLogin && !deCodingToken) || (needUnLogin && deCodingToken)) {
        return <Navigate to="/"/>;
    }
    return children;
}

/*작성자인지 아닌지*/
export function testAdmin (adminId) {
    const deCodingToken = checkToken();
    if(deCodingToken.memberId !== adminId) {
        return <Navigate to="/"/>;
    }
}


