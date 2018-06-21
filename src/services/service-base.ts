import flagwind from "flagwind-core";
import { ApplicationContext } from "src/application";
import axios, { AxiosResponse, AxiosPromise } from "axios";
import { baseUrl } from "src/settings";
/**
 * 业务服务基类。
 * @abstract
 * @class
 * @version 1.0.0
 */
export default abstract class ServiceBase
{

    protected url(url: string): string {
        return baseUrl + url;
    }

    /**
     * 获取当前应用的上下文实例。
     * @protected
     * @property
     * @returns ApplicationContext
     */
    protected get applicationContext(): ApplicationContext {
        return flagwind.Application.context as ApplicationContext;
    }

    /**
     * 发送post请求
     * @param url 请求地址
     * @param data 发送的参数
     */
    protected _post<T>(url: string, data?: any): Promise<T> {
        return axios.post(this.url(url), data).then(res => res.data);
    }

    /**
     * 发送get请求
     * @param url 请求地址
     */
    protected _get<T>(url: string): Promise<T> {

        return axios.get(this.url(url)).then(res => res.data);
    }

    /**
     * 发送put请求
     * @param url 请求地址
     * @param data 请求参数
     */
    protected _put<T>(url: string, data?: any): Promise<T> {
        return axios.put(this.url(url), data).then(res => res.data);
    }

    /**
     * 发送delete请求 请求地址
     * @param url
     */
    protected _delete<T>(url: string): Promise<T> {
        return axios.delete(this.url(url)).then(res => res.data);
    }
}
