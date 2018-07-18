import {component, View, watch} from "flagwind-web";
import "./index.less";
import moment from "moment";
import HasService from "views/monitoring2/has-service";

interface IItem {
    company: string;
    push: number;
    collectUnreg: number;
    collectHis: number;
    collectToday: number;
    collectTotal: number;
    notCollect: number;
    uploadSucceed: number;
    notUpload: number;
    dataInsert: number;
    notInsert: number;
}

@component({
    template: require("./index.html")
})
export default class BottomComp extends HasService {
    public days: Array<string> = [];
    public day = moment().format("YYYYMMDD");
    public columns = [
        {
            title: "厂家",
            key: "company",
            align: "center",
        },
        {
            title: "推送量",
            key: "push",
            align: "center",
        },
        {
            title: "未注册",
            key: "collectUnreg",
            align: "center",
        },
        {
            title: "历史数据量",
            key: "collectHis",
            align: "center",
        },
        {
            title: "当日数据量",
            key: "collectToday",
            align: "center",
        },
        {
            title: "采集量",
            key: "collectTotal",
            align: "center",
        },
        {
            title: "未采集",
            key: "notCollect",
            align: "center",
        },
        {
            title: "已上传",
            key: "uploadSucceed",
            align: "center",
        },
        {
            title: "未上传",
            key: "notUpload",
            align: "center",
        },
        {
            title: "录入",
            key: "dataInsert",
            align: "center",
        },
        {
            title: "未录入",
            key: "notInsert",
            align: "center",
        },
    ];
    public data: Array<IItem> = [];

    @watch("day")
    private onDayChange(nv) {
        this.fetchData(nv);
    }
    private mounted() {
        this.initUI();
        this.fetchData(this.day);
    }
    private initUI() {
        for (let i = 0; i < 7; ++i) {
            this.days.push(moment().subtract(i, "days").format("YYYYMMDD"));
        }
    }
    private async fetchData(day: string) {
        try {
            let {result} = await this.service.getTableData(day);
            this.data = result;
        } catch (e) {
            console.log(e);
            this.$notice.error({title: "获取表格数据失败"});
        }
    }
}
