let debug = process.env.NODE_ENV === "development";
export const global = (<any>window);
export const globalSetting = global.faceSetting;

/**
 * 后端地址
 * @type {string}
 */
export const baseUrl = "http://192.168.101.27:8889"; // http://192.168.101.27:8080

export const uploadUrl = `${baseUrl}/unity/attachment/upload`;
/**
 * vxg插件路径
 */
export const playerPath =  "/static/vxgPlayer/pnacl/Release/media_player.nmf";

/**
 * 地图服务地址
 * @type {string}
 */
export const mapBaseUrl = debug ? "http://192.168.101.39:6080/arcgis/rest/services/yantai_2018_05_03/MapServer" : "http://192.168.101.39:6080/arcgis/rest/services/yantai_2018_05_03/MapServer";
export const mapImageUrl = debug ? "" : "http://10.52.86.242:6080/arcgis/rest/services/2013yingxiangditu/MapServer";
export const mapZhujiImageUrl = debug ? "http://10.52.86.242:6080/arcgis/rest/services/2013yingxiangzhuji/MapServer" : "http://10.52.86.242:6080/arcgis/rest/services/2013yingxiangzhuji/MapServer";

/**
 * 环境
 */

export const isDev = globalSetting.isDev; // 开发环境还是生产环境
export const isOnline = globalSetting.isOnline; // 真数据还是假数据
export const prefix = isDev ? "" : globalSetting.prefix;

/**
 * 动画相关配置
 */

export const beforeAll =                    globalSetting.beforeAll                    || 600;     // 所有动画开始之前的时间
export const insertMyUsuallyAppInterval =   globalSetting.insertMyUsuallyAppInterval   || 600;     // 在vuex中插入常用app的时间间隔

/**
 * 首页
 */

/*********************************
 ************ ajax ***************
 *********************************/

export const getApps =                  `/unity/home/app/list&state=all`;                 // 获取首页app
export const getAlarmStat =             `/unity/face/statistic/alarm/days/num`;           // 报警数统计
export const getAlarmList =             `/unity/face/alarm/list`;                         // 报警中心
export const getIdentiStat =            `/unity/face/statistic/identify/days/num`;        // 识别数统计
export const changeUsuallyApps =        `/unity/home/app/change`;                         // 修改我的常用

/**
 * 大屏
 */

export const getCameras =               `/unity/face/statistic/heart`;                    // 相机点位列表
export const getSexStat =               `/unity/face/statistic/identify/sex`;             // 性别统计
export const getAgeStat =               `/unity/face/statistic/identify/age`;             // 年龄统计
export const getTodayFlowStat =         `/unity/face/statistic/identify/hour`;            // 今日流量统计
export const getCameraFlowRank =        `/unity/face/statistic/identify/topN`;            // 相机流量排名top5
export const getThisWeekFlowStat =      `/unity/face/statistic/identify/week`;            // 本周流量统计
export const getDeviceOnlineStat =      `/unity/face/statistic/veriface/online`;          // 设备在线统计
export const getIdentifyAndAlarm =      `/unity/face/statistic//identify-alarm/today`;    // 识别and报警
export const getThisMonthFlowStat =     `/unity/face/statistic/identify/month`;           // 本月流量统计
export const getTodayAlarmClassify =    `/unity/face/statistic/alarm/repository`;         // 今日报警分析类统计

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
