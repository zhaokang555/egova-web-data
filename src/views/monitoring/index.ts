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
} from "./canvas-utils";
import {createRunningPointsAlongPath} from "views/monitoring/points-utils";
import {loadImages} from "views/monitoring/image-utils";

const haikangOut = {x: 180, y: 142};
const notCollectYetIn = {x: 212, y: 75};

@component({
    template: require("./index.html")
})
export default class Monitoring extends View {
    private async mounted() {
        const arrowLayer = document.getElementById("arrow-layer") as HTMLCanvasElement;
        const panelLayer = document.getElementById("panel-layer")as HTMLCanvasElement;
        const bgLayer = document.getElementById("bg-layer")as HTMLCanvasElement;

        this.renderBg(bgLayer);
        this.renderPanels(panelLayer);

        const render = () => {
            this.renderArrows(arrowLayer);
            // 如果使用了tween.js再打开
            // TWEEN.update();
            requestAnimationFrame(render);
        };
        render();
    }

    private async renderBg(canvas: HTMLCanvasElement) {
        const [imgHaikang, imgServer, imgFirewall, imgPlatform] = await loadImages([
            require("src/assets/images/monitoring/haikang.png"),
            require("src/assets/images/monitoring/server.png"),
            require("src/assets/images/monitoring/firewall.png"),
            require("src/assets/images/monitoring/platform.png"),
        ]);
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgHaikang, 28, 117);
        ctx.drawImage(imgServer, 291, 108, 60, 66);
        ctx.drawImage(imgFirewall, 475, 111, 62, 60);
        ctx.drawImage(imgServer, 667, 108, 60, 66);
        ctx.drawImage(imgPlatform, 852, 111, 90, 61);
        drawText(ctx, 80, 195, "海康");
        drawText(ctx, 290, 195, "云隼采集");
        drawText(ctx, 485, 195, "网闸");
        drawText(ctx, 665, 195, "数据中心");
        drawText(ctx, 870, 195, "平台");
        ctx.restore();
    }

    private renderPanels(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPanelWithWarning(ctx, 174, 14, "尚未采集", 100000, "当前采集数据积压过多");
        drawPanelWithWarning(ctx, 357, 14, "尚未上传", 100000, "当前上传数据积压过多");
        drawPanelWithWarning(ctx, 730, 14, "尚未录入", 100000, "当前录入数据积压过多");
        drawPanel(ctx, 50, 225, "推送量", 20000);
        drawPanel(ctx, 270, 225, "采集量", 19000);
        drawPanel(ctx, 645, 225, "上传量", 18000);
        drawPanel(ctx, 850, 225, "已录入", 17000);
        ctx.restore();
    }

    private renderArrows(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // drawArrow2(ctx, 180, 142, 280, 142, 2000);
        drawArrow2(ctx, 360, 142, 460, 142, 2000);
        drawArrow2(ctx, 545, 142, 660, 142, 2000);
        drawArrow2(ctx, 730, 142, 845, 142, 2000);

        // drawArrow2(ctx, 212, 130, 212, 75, 2000);
        // drawArrow2(ctx, 232, 75, 232, 130, 2000);
        drawArrow2(ctx, 392, 130, 392, 75, 2000);
        drawArrow2(ctx, 418, 75, 418, 130, 2000);
        drawArrow2(ctx, 762, 130, 762, 75, 2000);
        drawArrow2(ctx, 788, 75, 788, 130, 2000);
        drawPolylineArrow(ctx, "M180 142 L212 142 L212 75",180, 142, 212, 75, 3/2*Math.PI);
        // drawPolylineArrow(ctx, "M232 75 L232 130 L280 142");
        ctx.restore();
    }

    private renderPoints(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const points1 = createRunningPointsAlongPath(12, [{x: 120, y: 140}, {x: 90,  y: 0},  {x: 0,  y: -80}]);
        const points2 = createRunningPointsAlongPath(8,  [{x: 235, y: 60},  {x: 0,   y: 80}, {x: 75, y: 0}]);
        const points3 = createRunningPointsAlongPath(12, [{x: 335, y: 140}, {x: 55,  y: 0},  {x: 0,  y: -80}]);
        const points4 = createRunningPointsAlongPath(8,  [{x: 417, y: 60},  {x: 0,   y: 80}, {x: 80, y: 0}]);
        const points5 = createRunningPointsAlongPath(12, [{x: 515, y: 140}, {x: 170, y: 0}]);
        const points6 = createRunningPointsAlongPath(12, [{x: 710, y: 140}, {x: 50,  y: 0},  {x: 0,  y: -80}]);
        const points7 = createRunningPointsAlongPath(8,  [{x: 787, y: 60},  {x: 0,   y: 80}, {x: 90, y: 0}]);
        points1.forEach(p => drawPoint(ctx, p.x, p.y));
        points2.forEach(p => drawPoint(ctx, p.x, p.y));
        points3.forEach(p => drawPoint(ctx, p.x, p.y));
        points4.forEach(p => drawPoint(ctx, p.x, p.y));
        points5.forEach(p => drawPoint(ctx, p.x, p.y));
        points6.forEach(p => drawPoint(ctx, p.x, p.y));
        points7.forEach(p => drawPoint(ctx, p.x, p.y));
        ctx.restore();
    }
}
