import {component, View} from "flagwind-web";
import TWEEN from "@tweenjs/tween.js";
import "./index.less";
import FlowComp from "./components/flow";

@component({
    template: require("./index.html"),
    components: {
        "u-flow-comp": FlowComp,
    }
})
export default class Monitoring extends View {
    private async mounted() {
    }
}
