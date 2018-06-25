import TWEEN from "@tweenjs/tween.js";

export default class Point {
    public x: number;
    public y: number;

    public constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     *
     * @param x
     * @param y
     * @param {number} speed 速度: 像素每毫秒
     * @returns {Promise}
     */
    public to(x, y, speed = 0.06) {
        const lineLen = Math.sqrt((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y));
        const duration = lineLen / speed;
        return new Promise(resolve => {
            new TWEEN.Tween(this).to({x: x, y: y}, duration)
                .onComplete(() => resolve())
                .start();
        });
    }

    public move(x, y) {
        return this.to(this.x + x, this.y + y);
    }

    public moveX(x) {
        return this.to(this.x + x, this.y);
    }

    public moveY(y) {
        return this.to(this.x, this.y + y);
    }
}
