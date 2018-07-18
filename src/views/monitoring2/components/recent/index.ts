import {component, View, watch} from "flagwind-web";
import "./index.less";
import CanResizeChart from "views/class/can-resize-chart";
import autowired from "src/annotations/autowired";
import Service from "views/monitoring2/service";
import ECharts from "components/echarts/echarts";
import INameCodeValue from "src/typings/INameCodeValue";
import moment from "moment";

@component({
    template: require("./index.html")
})
export default class RecentComp extends CanResizeChart {
    @autowired(Service)
    private service: Service;
    public option = {
        tooltip: {
            trigger: "axis"
        },
        legend: {
            right: "5%",
            top: "middle",
            orient: "vertical",
            // data:["海康","大华","宇视","海信"]
            data:[]
        },
        grid: [
            {x: '5%', y: '20%', width: '80%', height: '60%'},
        ],
        xAxis: {
            type: "category",
            boundaryGap: false,
            axisTick: {
                show: false,
            },
            data: ["20180101","20180102","20180103","20180104","20180105","20180106","20180107"]
        },
        yAxis: {
            type: "value",
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
            }
        },
        series: []
    };
    public btnList = [
        "推送量",
        "未注册",
        "历史数据量",
        "今日数据量",
        "采集总量",
        "上传总量",
        "已录入数据量",
    ];

    public activeIndex = 0;

    protected mounted() {
        super.mounted();
        this.fetchData(this.activeIndex);
    }

    @watch("activeIndex")
    private onActiveIndexChange(nv) {
        this.fetchData(nv);
    }

    private async fetchData(index: number) {
        let type = "00" + (index + 1);
        let {result} = await this.service.getRecent(type);

        this.option.xAxis.data = [];
        this.option.legend.data = [];
        this.option.series = [];

        let i: INameCodeValue<Array<number>>;
        for (i of result) {
            this.option.legend.data.push(i.name);
            this.option.series.push({
                name: i.name,
                type: "line",
                data: i.value
            });
        }

        for (let j = 6; j >= 0; --j) {
            this.option.xAxis.data.push(moment().subtract(j, "days").format("YYYYMMDD"));
        }
    }
}
