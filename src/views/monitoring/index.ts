import {component, View} from "flagwind-web";
import TWEEN from "@tweenjs/tween.js";
import "./index.less";
import Point from "./point";
import {drawArrow, drawLine, drawPanelWithContent, drawPanelWithWarning, drawPanel, drawText} from "./canvas-utils";
import set = Reflect.set;

type Path = Array<{
    x: number;
    y: number;
}>;

@component({
    template: require("./index.html")
})
export default class Monitoring extends View {
    private async mounted() {

        let [imgHaikang, imgServer, imgFirewall, imgPlatform] = await this.loadImages([
            require("src/assets/images/monitoring/haikang.png"),
            require("src/assets/images/monitoring/server.png"),
            require("src/assets/images/monitoring/firewall.png"),
            require("src/assets/images/monitoring/platform.png"),
        ]);

        let canvas = document.getElementById("data-flow") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d");

        let points1 = this.createRunningPointsAlongPath(5, [
            {x: 120, y: 140},
            {x: 110, y: 0},
            {x: 0, y: -80},
        ]);

        let points2 = this.createRunningPointsAlongPath(3, [
            {x: 240, y: 60},
            {x: 0, y: 80},
            {x: 60, y: 0},
        ]);

        let points3 = this.createRunningPointsAlongPath(5, [
            {x: 340, y: 140},
            {x: 70, y: 0},
            {x: 0, y: -80},
        ]);

        let points4 = this.createRunningPointsAlongPath(3, [
            {x: 420, y: 60},
            {x: 0, y: 80},
            {x: 50, y: 0},
        ]);

        let points5 = this.createRunningPointsAlongPath(4, [
            {x: 515, y: 140},
            {x: 165, y: 0},
        ]);

        let points6 = this.createRunningPointsAlongPath(5, [
            {x: 715, y: 140},
            {x: 65, y: 0},
            {x: 0, y: -80},
        ]);

        let points7 = this.createRunningPointsAlongPath(3, [
            {x: 790, y: 60},
            {x: 0, y: 80},
            {x: 50, y: 0},
        ]);

        let animate = () => {
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
            points1.forEach(p => ctx.fillRect(p.x, p.y, 4, 4));
            points2.forEach(p => ctx.fillRect(p.x, p.y, 4, 4));
            points3.forEach(p => ctx.fillRect(p.x, p.y, 4, 4));
            points4.forEach(p => ctx.fillRect(p.x, p.y, 4, 4));
            points5.forEach(p => ctx.fillRect(p.x, p.y, 4, 4));
            points6.forEach(p => ctx.fillRect(p.x, p.y, 4, 4));
            points7.forEach(p => ctx.fillRect(p.x, p.y, 4, 4));
            drawPanelWithWarning(ctx, 174, 14, "尚未采集", 100000, "当前采集数据积压过多");
            drawPanelWithWarning(ctx, 357, 14, "尚未上传", 100000, "当前上传数据积压过多");
            drawPanelWithWarning(ctx, 730, 14, "尚未录入", 100000, "当前录入数据积压过多");
            drawPanel(ctx, 50, 225, "推送量", 20000);
            drawPanel(ctx, 270, 225, "采集量", 19000);
            drawPanel(ctx, 645, 225, "上传量", 18000);
            drawPanel(ctx, 850, 225, "已录入", 17000);

            TWEEN.update();

            requestAnimationFrame(animate);
        };

        animate();

    }

    private loadImages(urls: Array<string>): Promise<Array<HTMLImageElement>> {
        let promises = urls.map(url => this.loadImage(url));
        return Promise.all(promises);
    }

    private loadImage(url): Promise<HTMLImageElement> {
        return new Promise(resolve => {
            let img = new Image();
            img.onload = () => resolve(img);
            img.src = url;
        });
    }

    private createRunningPointsAlongPath(count: number, path: Path) {
        let points: Array<Point> = [];
        let delay = 0;
        for (let i = 0; i < count; ++i) {
            points.push(new Point(path[0].x, path[0].y));
        }
        for (let p of points) {
            let pAnimation = () => {
                let promise = Promise.resolve(null);
                for (let j = 1; j < path.length; ++j) {
                    promise = promise.then(() => p.move(path[j].x, path[j].y));
                }
                promise.then(() => {
                    p.x = path[0].x;
                    p.y = path[0].y;
                    pAnimation();
                });
            };
            setTimeout(() => pAnimation(), delay);

            delay += 400;
        }
        return points;
    }
}
