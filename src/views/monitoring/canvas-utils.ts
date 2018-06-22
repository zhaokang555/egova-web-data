import {Path} from "views/monitoring/i-path";

type Context = CanvasRenderingContext2D;

export function drawArrow(ctx: Context, fromX, fromY, toX, toY) {
    const color = "#797979";
    const headLen = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    // 绘制线段
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.stroke();

    // 绘制箭头
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 8), toY - headLen * Math.sin(angle - Math.PI / 8));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 8), toY - headLen * Math.sin(angle + Math.PI / 8));
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 8), toY - headLen * Math.sin(angle - Math.PI / 8));

    // 给箭头上色
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}

export function drawArrow2(ctx: Context, x0, y0, x1, y1, duration = 2000) {
    ctx.save();

    // 将箭头起点平移到原点, 将箭头方向旋转向x轴正方向
    ctx.translate(x0, y0);
    const deltaY = y1 - y0;
    const deltaX = x1 - x0;
    const angle = Math.atan2(deltaY, deltaX);
    ctx.rotate(angle);

    // 用路径绘制箭头
    const len = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const arrowLen = 10;
    const lineLen = len - arrowLen;
    const p2d = new Path2D(`M0 0 v 2 h ${lineLen} v 2 L${len} 0 L${lineLen} -4  v 2 h ${0 - lineLen} Z`);

    // 填充
    let gradient = ctx.createLinearGradient(-50,0, len + 50, 0);
    gradient.addColorStop(0,"#797979");
    if (duration !== 0) {
        // const offset = Math.abs((Date.now() % (duration * 2)) - duration);
        const left = (Date.now() - duration / 20) % duration;
        const offset = Date.now() % duration;
        const right = (Date.now() + duration / 20) % duration;
        gradient.addColorStop(left / duration,"#797979");
        gradient.addColorStop(offset / duration,"#ffffff");
        gradient.addColorStop(right / duration,"#797979");
    }
    gradient.addColorStop(1,"#797979");
    ctx.fillStyle = gradient;
    ctx.fill(p2d);

    ctx.restore();
}

export function drawPolylineArrow(ctx: Context, lineStr: string, x0, y0, x1, y1, arrowDirection, duration = 2000) {
    let x10, y10, x11, y11;
    if (x0 < x1) {
        x10 = x0 - 50;
        x11 = x1 + 50;
    } else if (x1 < x0) {
        x10 = x0 + 50;
        x11 = x1 - 50;
    }
    if (y0 < y1) {
        y10 = y0 - 50;
        y11 = y1 + 50;
    } else if (y1 < y0) {
        y10 = y0 + 50;
        y11 = y1 - 50;
    }
    let gradient = ctx.createLinearGradient(x10, y10, x11, y11);
    gradient.addColorStop(0,"#797979");
    if (duration !== 0) {
        // const offset = Math.abs((Date.now() % (duration * 2)) - duration);
        let left = (Date.now() - duration / 20) % duration;
        let offset = Date.now() % duration;
        let right = (Date.now() + duration / 20) % duration;
        gradient.addColorStop(left / duration,"#797979");
        gradient.addColorStop(offset / duration,"#ffffff");
        gradient.addColorStop(right / duration,"#797979");
    }
    gradient.addColorStop(1,"#797979");

    ctx.save();
    // 填充
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    let line = new Path2D(lineStr);
    ctx.stroke(line);
    ctx.lineWidth = 1;
    ctx.fillStyle = "#797979";
    ctx.translate(x1, y1);
    ctx.rotate(arrowDirection);
    let arrow = new Path2D("M10 0 L0 4 L0 -4 Z");
    ctx.fill(arrow);
    ctx.restore();
}

export function drawLine(ctx: Context, fromX, fromY, toX, toY) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = "#797979";
    ctx.lineWidth = 3;
    ctx.stroke();
}

export function drawPanelWithContent(ctx: Context, x, y, title, count, content) {
    ctx.lineWidth = 1;
    ctx.fillStyle = "#ffdffe";
    ctx.fillRect(x, y, 160, 45);
    ctx.font = "15px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(title, x + 5, y + 20);
    ctx.fillText(count.toString(), x + 90, y + 20);
    ctx.fillStyle = "#009b21";
    ctx.fillText(content, x + 5, y + 40);
}

export function drawPanelWithWarning(ctx: Context, x, y, title, count, warning) {
    ctx.lineWidth = 1;
    ctx.fillStyle = "#ffdffe";
    ctx.strokeStyle = "#797979";
    ctx.fillRect(x, y, 160, 45);
    ctx.strokeRect(x, y, 160, 45);
    ctx.font = "15px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(title, x + 5, y + 20);
    ctx.fillText(count.toString(), x + 90, y + 20);
    ctx.fillStyle = "#ff0004";
    ctx.fillText(warning, x + 5, y + 40);
}

export function drawPanel(ctx: Context, x, y, title, count) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#797979";
    ctx.strokeRect(x, y, 100, 50);
    ctx.font = "15px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(title, x + 10, y + 20);
    ctx.fillText(count.toString(), x + 10, y + 40);
}

export function drawText(ctx: Context, x, y, text) {
    ctx.font = "15px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(text, x, y);
}

export function drawPoint(ctx: Context, x, y,) {
    ctx.fillStyle = "#ffce30";
    ctx.fillRect(x, y, 4, 4);
}
