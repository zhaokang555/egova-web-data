type Context = CanvasRenderingContext2D;

export function drawArrow(ctx: Context, fromX, fromY, toX, toY) {
    const color = "#797979";
    const headLen = 10;
    let angle = Math.atan2(toY - fromY, toX - fromX);

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

export function drawArrow2(ctx: Context, rx0, ry0, rx4, ry4) {
    ctx.save();

    // 将箭头起点平移到原点, 将箭头方向旋转向x轴正方向
    ctx.translate(rx0, ry0);
    const deltaY = ry4 - ry0;
    const deltaX = rx4 - rx0;
    const angle = Math.atan2(deltaY, deltaX);
    ctx.rotate(angle);

    // 用路径绘制箭头
    const len = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const arrowLen = 10;
    const lineLen = len - arrowLen;
    let path2 = new Path2D(`M0 0 v 4 h ${lineLen} v 2 L${len} 0 L${lineLen} -6  v 2 h ${0 - lineLen} Z`);

    // 填充
    ctx.fillStyle = "#797979";
    ctx.fill(path2);

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
