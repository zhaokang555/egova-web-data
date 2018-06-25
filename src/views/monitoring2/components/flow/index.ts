import {component, View} from "flagwind-web";
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
import {createRunningPointsAlongPath} from "../../points-utils";
import {loadImages} from "../../image-utils";

const haikangOut = {x: 180, y: 142};
const notCollectYetIn = {x: 212, y: 75};

@component({
    template: require("./index.html")
})
export default class FlowComp extends View {
    public animate = false;
    private async mounted() {
        const offset = Date.now() % 3000;
        setTimeout(() => this.animate = true, 3000 - offset + 3000);
        const arrowLayer = document.getElementById("arrow-layer") as HTMLCanvasElement;

        const render = () => {
            this.renderArrows(arrowLayer);
            // 如果使用了tween.js再打开, 否则会浪费性能
            // TWEEN.update();
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
