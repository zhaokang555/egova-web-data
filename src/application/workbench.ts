import flagwind from "flagwind-core";
import WorkbenchBase = flagwind.WorkbenchBase;
import ApplicationContextBase = flagwind.ApplicationContextBase;
import ApplicationContext from "./context";
import Workspace from "./workspace";

import Vue from "vue";
import Router from "vue-router";
import { routes } from "../routes";
import Vuex from "vuex";
import modules from "../store";

import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
// 导入系统组件
import { components } from "flagwind-web";

// 导入应用组件
import { ECharts} from "../components";

// 倒入全局样式
import "flagwind-web/dist/styles/flagwind.css";
import "src/styles/index.less";

/**
 * 提供工作台的基本封装。
 * @class
 * @version 1.0.0
 */
export default class Workbench extends WorkbenchBase {
    private _workspace: Workspace;

    /**
     * 获取当前应用的主工作空间。
     * @property
     * @returns Workspace
     */
    public get workspace(): Workspace {
        return this._workspace;
    }

    /**
     * 初始化工作台的新实例。
     * @param  {ApplicationContextBase} applicationContext
     */
    public constructor(context: ApplicationContextBase) {
        super(context);
    }

    /**
     * 当工作台打开时调用。
     * @async
     * @protected
     * @virtual
     * @param  {Array<string>} args
     * @returns void
     */
    protected async onOpen(args: Array<string>): Promise<void> {
        let context = this.applicationContext as ApplicationContext;

        // console.log(process.env.NODE_ENV);

        // 关闭生产提示
        Vue.config.productionTip = false;
        Vue.config.errorHandler =  (err, vm, info) =>{
           console.error(err);
           console.warn(info);
        };
        // Vue.config.performance = true;

        // 初始化组件
        this.initializeComponent(context);

        // 初始化路由程序
        this.initializeRouter(context);

        // 初始化状态管理程序
        this.initializeStore(context);

        // Axios请求拦截器，随着业务的复杂，Axios层的使用将会越来越复杂，写个精简版的就行了。
        axios.interceptors.request.use(config => {
            let token = Cookies.get("access_token");
            // console.log("web api url:" + config.url);
            if (token && config.url && config.url.indexOf("unity") >= 0) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
                // console.log("config heaher authorization:" + "Bearer " + token);
                config.headers.Authorization = "Bearer " + token;
                // console.log("interceptors config=", config);
            }
            return config;
        }, error => {
            return Promise.reject(error);
        });

        // 初始化工作空间
        this._workspace = this.createWorkspace();
    }

    /**
     * 创建一个工作空间对象。
     * @override
     * @returns IWorkspace
     */
    protected createWorkspace(): Workspace {
        return new Workspace(this);
    }

    /**
     * 初始化全局组件。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeComponent(context: ApplicationContext): void {
        // 注册系统组件
        Vue.use(components);

        // 注册应用组件
        Vue.component("g-echarts", ECharts);

        // 解决flagwind-web中cascader组件解析成carousel
        const iview = require("iview");
        Vue.component("i-carousel", iview.Carousel);
        Vue.component("i-cascader", iview.Cascader);
        // 注册布局母版
    }

    /**
     * 初始化路由程序。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeRouter(context: ApplicationContext): void {
        // 注册路由组件
        Vue.use(Router);

        // 初始化路由程序
        let router = new Router({ routes });

        // 设置路由程序
        context.router = router;
    }

    /**
     * 初始化状态管理程序。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeStore(context: ApplicationContext): void {
        // 注册状态管理程序
        Vue.use(Vuex);

        // 初始化状态容器
        let store = new Vuex.Store
            ({
                modules
            });

        // 设置状态容器
        context.store = store;
    }
}
