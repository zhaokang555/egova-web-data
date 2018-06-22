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
    drawPoint
} from "./canvas-utils";
import {createRunningPointsAlongPath} from "views/monitoring/points-utils";
import {loadImages} from "views/monitoring/image-utils";

type Context = CanvasRenderingContext2D;

@component({
    template: require("./index.html")
})
export default class Monitoring extends View {
    private async mounted() {
        let arrowLayer = document.getElementById("arrow-layer") as HTMLCanvasElement;
        let panelLayer = document.getElementById("panel-layer")as HTMLCanvasElement;
        let bgLayer = document.getElementById("bg-layer")as HTMLCanvasElement;

        this.renderBg(bgLayer);
        this.renderPanels(panelLayer);

        let animate = () => {
            this.renderArrows(arrowLayer);
            TWEEN.update();
            requestAnimationFrame(animate);
        };
        animate();
    }

    private async renderBg(canvas: HTMLCanvasElement) {
        let [imgHaikang, imgServer, imgFirewall, imgPlatform] = await loadImages([
            require("src/assets/images/monitoring/haikang.png"),
            require("src/assets/images/monitoring/server.png"),
            require("src/assets/images/monitoring/firewall.png"),
            require("src/assets/images/monitoring/platform.png"),
        ]);
        let ctx = canvas.getContext("2d");
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
        let ctx = canvas.getContext("2d");
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
        let ctx = canvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawArrow2(ctx, 180, 142, 280, 142);
        drawArrow2(ctx, 360, 142, 460, 142);
        drawArrow2(ctx, 545, 142, 660, 142);
        drawArrow2(ctx, 730, 142, 845, 142);

        drawArrow2(ctx, 212, 130, 212, 75);
        drawArrow2(ctx, 235+3, 75, 235+3, 130);
        drawArrow2(ctx, 395-3, 130, 395-3, 75);
        drawArrow2(ctx, 415+3, 75, 415+3, 130);
        drawArrow2(ctx, 765-3, 130, 765-3, 75);
        drawArrow2(ctx, 785+3, 75, 785+3, 130);
        ctx.restore();
    }

    private renderPoints(canvas: HTMLCanvasElement) {
        let ctx = canvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let points1 = createRunningPointsAlongPath(12, [{x: 120, y: 140}, {x: 90,  y: 0},  {x: 0,  y: -80}]);
        let points2 = createRunningPointsAlongPath(8,  [{x: 235, y: 60},  {x: 0,   y: 80}, {x: 75, y: 0}]);
        let points3 = createRunningPointsAlongPath(12, [{x: 335, y: 140}, {x: 55,  y: 0},  {x: 0,  y: -80}]);
        let points4 = createRunningPointsAlongPath(8,  [{x: 417, y: 60},  {x: 0,   y: 80}, {x: 80, y: 0}]);
        let points5 = createRunningPointsAlongPath(12, [{x: 515, y: 140}, {x: 170, y: 0}]);
        let points6 = createRunningPointsAlongPath(12, [{x: 710, y: 140}, {x: 50,  y: 0},  {x: 0,  y: -80}]);
        let points7 = createRunningPointsAlongPath(8,  [{x: 787, y: 60},  {x: 0,   y: 80}, {x: 90, y: 0}]);
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
