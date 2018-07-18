import {component, View} from "flagwind-web";
import "./index.less";
import HasService from "views/monitoring2/has-service";

@component({
    template: require("./index.html")
})
export default class TopComp extends HasService {
    public todayPushTotal = 0;
    public yesterdayPushTotal = 0;
    public todayCollectTotal = 0;
    public notCollectTotal = 0;
    public todayUploadTotal = 0;
    public notUploadTotal = 0;
    public todayInsertTotal = 0;
    public notInsertTotal = 0;

    public async mounted() {
        try {
            let {result} = await this.service.getTopEightNums();
            this.notCollectTotal = result.notCollectTotal;
            this.notInsertTotal = result.notInsertTotal;
            this.notUploadTotal = result.notUploadTotal;
            this.todayCollectTotal = result.todayCollectTotal;
            this.todayInsertTotal = result.todayInsertTotal;
            this.todayPushTotal = result.todayPushTotal;
            this.todayUploadTotal = result.todayUploadTotal;
            this.yesterdayPushTotal = result.yesterdayPushTotal;
        } catch (e) {
            console.log(e);
            this.$notice.error({title: "获取总量失败"});
        }
    }
}
