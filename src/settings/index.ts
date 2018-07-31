let debug = process.env.NODE_ENV === "development";
export const global = (<any>window);
export const globalSetting = global.dataSetting;

/**
 * 后端地址
 * @type {string}
 */
export const baseUrl = globalSetting.baseUrl;

/**
 * 环境
 */

export const isDev = globalSetting.isDev; // 开发环境还是生产环境
export const prefix = isDev ? "" : globalSetting.prefix;

/**
 * arcgis地图配置定义
 */
export const arcgisSetting = {
    arcgisApi: debug ? "http://27.17.34.22:8081/arcgis4js/library/3.21/" : "http://27.17.34.22:8081/arcgis4js/library/3.21/",
    routeUrl: debug ? "http://27.17.34.22:6080/arcgis/rest/services/Features/NAServer/Route" : "",
    center: [121.2701, 37.5652],
    wkid: 4326,
    zoom: 3,
    slider: false,
    sliderPosition: "bottom-left",
    tiledUrls: [
        {
            id: "base_arcgis_tiled",
            url: debug ? "http://192.168.101.39:6080/arcgis/rest/services/yantai_2018_05_03/MapServer" : "http://192.168.101.39:6080/arcgis/rest/services/yantai_2018_05_03/MapServer",
            title: "瓦片图层"
        },
        {
            id: "base_arcgis_zhuji",
            url: debug ? "http://27.17.34.22:6080/arcgis/rest/services/Road/MapServer" : "http://192.168.101.39:6080/arcgis/rest/services/yantai_2018_05_03/MapServer",
            title: "道路图层"
        },
        {
            id: "base_arcgis_image",
            url: debug ? "http://27.17.34.22:6080/arcgis/rest/services/Road/MapServer" : "http://192.168.101.39:6080/arcgis/rest/services/yantai_2018_05_03/MapServer",
            title: "影像图层"
        }
    ],
    ...global.arcgisSetting
};
