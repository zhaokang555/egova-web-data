import {component, View} from "flagwind-web";
import "./index.less";

@component({
    template: require("./index.html")
})
export default class BottomComp extends View {
    public columns = [
        {
            title: "厂家",
            key: "company",
            align: "center",
            // width: 120,
        },
        {
            title: "推送量",
            key: "push",
            align: "center",
            // width: 120,
        },
        {
            title: "未注册",
            key: "notRegistered",
            align: "center",
            // width: 120,
        },
        {
            title: "历史数据量",
            key: "history",
            align: "center",
            // width: 120,
        },
        {
            title: "当日数据量",
            key: "today",
            align: "center",
            // width: 120,
        },
        {
            title: "采集量",
            key: "collected",
            align: "center",
            // width: 120,
        },
        {
            title: "未采集",
            key: "notCollected",
            align: "center",
            // width: 120,
        },
        {
            title: "已上传",
            key: "uploaded",
            align: "center",
            // width: 120,
        },
        {
            title: "未上传",
            key: "notUploaded",
            align: "center",
            // width: 120,
        },
        {
            title: "录入",
            key: "recorded",
            align: "center",
            // width: 120,
        },
        {
            title: "未录入",
            key: "notRecorded",
            align: "center",
            // width: 120,
        },
    ];
    public data = [
        {
            key: 0,
            company: "海康",
            push: 10000,
            notRegistered: 10000,
            history: 10000,
            today: 10000,
            collected: 10000,
            notCollected: 10000,
            uploaded: 10000,
            notUploaded: 10000,
            recorded: 10000,
            notRecorded: 10000,
            cellClassName: {
                notRegistered: "red",
            }
        },
        {
            key: 0,
            company: "大华",
            push: 10000,
            notRegistered: 10000,
            history: 10000,
            today: 10000,
            collected: 10000,
            notCollected: 10000,
            uploaded: 10000,
            notUploaded: 10000,
            recorded: 10000,
            notRecorded: 10000,
        },
        {
            key: 0,
            company: "宇视",
            push: 10000,
            notRegistered: 10000,
            history: 10000,
            today: 10000,
            collected: 10000,
            notCollected: 10000,
            uploaded: 10000,
            notUploaded: 10000,
            recorded: 10000,
            notRecorded: 10000,
        },
        {
            key: 0,
            company: "海信",
            push: 10000,
            notRegistered: 10000,
            history: 10000,
            today: 10000,
            collected: 10000,
            notCollected: 10000,
            uploaded: 10000,
            notUploaded: 10000,
            recorded: 10000,
            notRecorded: 10000,
            cellClassName: {
                history: "red",
                notCollected: "red",
                notUploaded: "red",
                notRecorded: "red",
            }
        },
    ];
}
