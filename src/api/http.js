import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'https://www.themealdb.com';
axios.defaults.timeout = 5000;


axios.interceptors.request.use(config => { 
    return config;
}, error => { 
    return Promise.error(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    if (response.status === 200) {
        return Promise.resolve(response);
    } else { 
        return Promise.reject(response);
    }
}, error => { 
    handleError(error.response);
});

function handleError(res) {
    switch (res.code) { 
        case 401:
            alert("未授权，请重新登录！");
            break;
        case 403:
            alert('拒绝访问');
            break;
        case 404:
            alert('抱歉，资源未找到！');
            break;
        case 500:
            alert('服务器错误！');
            break;
        case 504:
            alert('网路超时');
            break;
        default:
            alert('服务器正在联调中，请稍候！');
            break;
    }
    return Promise.reject(res);
}

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
const $get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
const $post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params)) //是将对象 序列化成URL的形式，以&进行拼接   
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export default {
    install: (app) => {
        app.config.globalProperties['$get'] = $get;
        app.config.globalProperties['$post'] = $post;
        app.config.globalProperties['$axios'] = axios;
    }
}
