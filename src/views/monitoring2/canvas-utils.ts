import {Path} from "./i-path";

type Context = CanvasRenderingContext2D;

/**
 * 绘制箭头
 * @param {Context} ctx
 * @param x0
 * @param y0
 * @param x1
 * @param y1
 * @param {number} duration 动画周期长度(ms)
 * @param {number} arrowLen 箭头长度
 * @param {number} arrowWidth 箭头宽度
 * @param {number} lineWidth 线段宽度
 */
export function drawArrow2(ctx: Context, x0, y0, x1, y1, duration = 4000, arrowLen = 36, arrowWidth = 36, lineWidth = 4) {
    ctx.save();

    // 将箭头起点平移到原点, 将箭头方向旋转向x轴正方向
    ctx.translate(x0, y0);
    const deltaY = y1 - y0;
    const deltaX = x1 - x0;
    const angle = Math.atan2(deltaY, deltaX);
    ctx.rotate(angle);

    // 用路径绘制箭头
    const len = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const lineLen = len - arrowLen;
    const p2d = new Path2D(`M0 0 v ${lineWidth/2} h ${lineLen} v ${(arrowWidth-lineWidth)/2} L${len} 0 L${lineLen} ${0-arrowWidth/2}  v ${(arrowWidth-lineWidth)/2} h ${0 - lineLen} Z`);

    // 填充
    let gradient = ctx.createLinearGradient(0-len,0, len + len, 0);
    gradient.addColorStop(0,"#4e8cee");
    if (duration !== 0) {
        // const offset = Math.abs((Date.now() % (duration * 2)) - duration);
        const left = (Date.now() - duration / 4) % duration;
        const offset = Date.now() % duration;
        const right = (Date.now() + duration / 4) % duration;
        gradient.addColorStop(left / duration,"#4e8cee");
        gradient.addColorStop(offset / duration,"#ff8c8c");
        gradient.addColorStop(right / duration,"#4e8cee");
    }
    gradient.addColorStop(1,"#4e8cee");
    ctx.fillStyle = gradient;
    ctx.fill(p2d);

    ctx.restore();
}

/**
 * 绘制折线箭头
 * @param {Context} ctx
 * @param {string} lineStr SVG Path 字符串
 * @param x0
 * @param y0
 * @param x1
 * @param y1
 * @param {number} duration 动画周期长度(ms)
 */
export function drawPolylineArrow(ctx: Context, lineStr: string, x0, y0, x1, y1, duration = 4000) {
    let deltaY = y1 - y0;
    let deltaX = x1 - x0;
    let len = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // 制作渐变色
    if (x0 < x1) {
        x0 -= len;
        x1 += len;
    } else if (x0 > x1) {
        x0 += len;
        x1 -= len;
    }
    if (y0 < y1) {
        y0 -= len;
        y1 += len;
    } else if (y0 > y1) {
        y0 += len;
        y1 -= len;
    }
    let gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    gradient.addColorStop(0,"#4e8cee");
    if (duration !== 0) {
        // const offset = Math.abs((Date.now() % (duration * 2)) - duration);
        const left = (Date.now() - duration / 4) % duration;
        const offset = Date.now() % duration;
        const right = (Date.now() + duration / 4) % duration;
        gradient.addColorStop(left / duration,"#4e8cee");
        gradient.addColorStop(offset / duration,"#ff8c8c");
        gradient.addColorStop(right / duration,"#4e8cee");
    }
    gradient.addColorStop(1,"#4e8cee");
    ctx.fillStyle = gradient;

    // 填充箭头
    let p2d = new Path2D(lineStr);
    ctx.fill(p2d);

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
