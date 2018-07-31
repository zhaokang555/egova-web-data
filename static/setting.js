/**
 *  注意: 以下配置会覆盖默认配置
 */
window.dataSetting = {
    isDev: true,
    isOnline: true,
    prefix: "data/",
    mapType:"arcgis",
    baseUrl: "http://192.168.101.27:8889",
};

window.arcgisSetting = {
    arcgisApi: "http://27.17.34.22:8081/arcgis4js/library/3.21/",
    routeUrl: "http://27.17.34.22:6080/arcgis/rest/services/Features/NAServer/Route",
    center: [121.2701, 37.5652],
    wkid: 4326,
    zoom: 3,
    slider: false,
    sliderPosition: "bottom-left",
    tiledUrls: [
        {
            id: "base_arcgis_tiled",
            url: "http://192.168.101.39:6080/arcgis/rest/services/yantai_2018_05_03/MapServer",
            title: "瓦片图层"
        },
        {
            id: "base_arcgis_zhuji",
            url: "http://27.17.34.22:6080/arcgis/rest/services/Road/MapServer",
            title: "道路图层"
        },
        {
            id: "base_arcgis_image",
            url: "http://27.17.34.22:6080/arcgis/rest/services/Road/MapServer",
            title: "影像图层"
        }
    ],
};
