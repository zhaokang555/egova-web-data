import {component, View} from "flagwind-web";
import TWEEN from "@tweenjs/tween.js";
import "./index.less";
import FlowComp from "./components/flow";
import TopComp from "./components/top";
import LeftComp from "./components/left";
import HeaderComp from "./components/header";
import RecentComp from "./components/recent";
import BottomComp from "./components/bottom";

@component({
    template: require("./index.html"),
    components: {
        "u-flow-comp": FlowComp,
        "u-top-comp": TopComp,
        "u-left-comp": LeftComp,
        "u-header-comp": HeaderComp,
        "u-recent-comp": RecentComp,
        "u-bottom-comp": BottomComp,
    }
})
export default class Monitoring extends View {
}
