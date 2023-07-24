import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import type { Response } from './types';
import { showFailToast } from 'vant';
import 'vant/es/toast/style';
import router from '@/router';
import { getToken } from '../auth/auth';
/**
 *  axios版本: 1.2.0-alpha.1
 *  1.4.0版本用着有些问题不知道怎么解决, 这里就不弄了
 */


// 创建axios实例
axios.defaults.withCredentials = true
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: 5 * 1000
});
// axios实例拦截请求
service.interceptors.request.use(

    (config: AxiosRequestConfig) => {
        config.headers = {
            ...config.headers,
            // ...auth.headers(), // 你的自定义headers，如token等
        };
        if (getToken()) {
            config.headers['swpu_token'] = getToken()
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// axios实例拦截响应
service.interceptors.response.use(
    // 2xx时触发
    (response: any) => {
        // response.data就是后端返回的数据
        const { code, message } = response.data;
        let errMessage: string | null = '';
        switch (code) {
            case 200:   // 成功码200
                break;
            case 250:     // 判断token过期的code是? 
                if (message === "登陆信息校验失败,请检查登陆状态" && !getToken()) {
                    errMessage = '本次登录过期, 请重新登陆';
                    showFailToast(errMessage)
                    router.replace({ path: '/login?redirect=/' });
                }
                break;
            case 302: // 请求重定向
                console.log('5555')
                break;
            default:
                errMessage = message;
                break;
        }
        return response.data;
    },
    // 非2xx时触发
    (error: AxiosError) => {
        showFailToast('网络异常');
        return Promise.reject(error);
    }
);
export type { AxiosResponse, AxiosRequestConfig };
export default service;
