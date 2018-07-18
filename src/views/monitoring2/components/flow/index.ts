import {component, View, config} from "flagwind-web";
import TWEEN from "@tweenjs/tween.js";
import "./index.less";
import {
    drawArrow2,
    drawLine,
    drawPanelWithContent,
    drawPanelWithWarning,
    drawPanel,
    drawText,
    drawPoint, drawPolylineArrow
} from "../../canvas-utils";
import HasService from "views/monitoring2/has-service";

interface IItem {
    notUploadStatus: "0" | "1";
    collectHisStatus: "0" | "1";
    notInsertStatus: "0" | "1";
    collectUnregStatus: "0" | "1";
    notCollectStatus: "0" | "1";
    company: string;
    notUpload: number;
    notCollect: number;
    collectUnreg: number;
    collectToday: number;
    collectHis: number;
    notInsert: number;
}

@component({
    template: require("./index.html")
})
export default class FlowComp extends HasService {
    public list: Array<IItem> = [];

    @config()
    public company: string;

    public get cur(): IItem {
        let cur = this.list.find(e => e.company === this.company);
        if (cur) return cur;
        return {
            "notUploadStatus": "1",
            "collectHisStatus": "1",
            "notInsertStatus": "0",
            "collectUnregStatus": "1",
            "notCollectStatus": "1",
            "notUpload": 0,
            "notCollect": 0,
            "company": "海康",
            "collectUnreg": 0,
            "collectToday": 0,
            "collectHis": 0,
            "notInsert": 0
        };
    }

    public animate = false;

    private async mounted() {
        this.initData();
        this.initLayer();
    }

    private async initData() {
        let {result} = await this.service.getFlow();
        this.list = result;
    }

    private initLayer() {
        const offset = Date.now() % 3000;
        setTimeout(() => this.animate = true, 3000 - offset + 3000);
        const arrowLayer = document.getElementById("arrow-layer") as HTMLCanvasElement;

        const render = () => {
            this.renderArrows(arrowLayer);
            requestAnimationFrame(render);
        };
        render();
    }

    private renderArrows(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawArrow2(ctx, 238, 255, 368, 255);
        drawArrow2(ctx, 454, 255, 584, 255);
        drawArrow2(ctx, 1038, 255, 1168, 255);
        drawArrow2(ctx, 1236, 285, 1236, 415);
        drawArrow2(ctx, 751, 605, 621, 605);
        drawArrow2(ctx, 525, 605, 395, 605);
        drawPolylineArrow(ctx, "M1240 547 h2 v62 h-240 v16 l-36 -18 l36 -18 v16 h236 v-58 Z", 1240, 547, 963, 608);
    }
}
