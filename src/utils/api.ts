import interceptor from './interceptor';

const formHeaders = {
    method: 'post',
    headers: { 
        'Content-Type': 'multipart/form-data' 
    },
    withCredentials: false,
}

const jsonHeaders = {
    method: 'post',
    headers: { 
        'Content-Type': 'application/json' 
    },
    withCredentials: false,
}

export const api = (url:any, apiData?:any, headers?:string) => {
    let apiUrl = url;
    let apiHeaders = (headers === 'formdata' ? formHeaders : jsonHeaders);
    return interceptor({
        url: apiUrl,
        data: apiData,
        ...apiHeaders
    });
};
