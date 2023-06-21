import interceptor from './jsonInterceptor';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}');

const jsonHeaders = {
    method: 'post',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userInfo?.token
    },
    withCredentials: false,
}

export const jsonApi = (apiUrl:string, apiData?:any) => {
    return interceptor({
        url: apiUrl,
        data: JSON.stringify(apiData),
        ...jsonHeaders
    });
};
