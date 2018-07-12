import {component, View} from "flagwind-web";
import "./index.less";
import option from "./option";
import CanResizeChart from "views/class/can-resize-chart";

@component({
    template: require("./index.html")
})
export default class RecentComp extends CanResizeChart {
    public option = option;
    public btnList = [
        "推送量",
        "未注册",
        "历史数据量",
        "今日数据量",
        "采集总量",
        "上传总量",
        "待上传数据量",
        "已录入数据量",
    ];
    public activeIndex = 0;

    protected mounted() {
        super.mounted();
    }
}
