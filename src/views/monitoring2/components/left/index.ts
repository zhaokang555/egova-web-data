import {component, View} from "flagwind-web";
import "./index.less";
import HasService from "views/monitoring2/has-service";

@component({
    template: require("./index.html")
})
export default class LeftComp extends HasService {
    public list: Array<{
        notUpload: number;
        notCollect: number;
        collectTotal: number;
        company: string;
        collectUnreg: number;
        collectToday: number;
        dataInsert: number;
        collectHis: number;
        push: number;
        uploadSucceed: number;
        notInsert: number;
    }> = [];
    public activeIndex = 0;

    public async mounted() {
        try {
            let {result} = await this.service.getTodayCompanyData();
            this.list = result;
        } catch (e) {
            console.log(e);
            this.$notice.error({title: "获取厂家数据失败"});
        }
    }

    private onClick(idx) {
        this.activeIndex = idx;
        this.$emit("clickcompany", this.list[this.activeIndex].company);
    }
}
