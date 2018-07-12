import {component, View} from "flagwind-web";
import "./index.less";

@component({
    template: require("./index.html")
})
export default class LeftComp extends View {
    public list = [
        {
            name: "海康",
            push: 200001,
            upload: 200002,
            collect: 200003,
            record: 200004,
        },
        {
            name: "大华",
            push: 200001,
            upload: 200002,
            collect: 200003,
            record: 200004,
        },
        {
            name: "宇视",
            push: 200001,
            upload: 200002,
            collect: 200003,
            record: 200004,
        },
        {
            name: "海信",
            push: 200001,
            upload: 200002,
            collect: 200003,
            record: 200004,
        },
    ];
    public activeIndex = 0;
}
