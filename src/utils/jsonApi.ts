import interceptor from './jsonInterceptor';

const jsonHeaders = {
    method: 'post',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
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
