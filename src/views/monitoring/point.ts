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

    public repeatLine() {
        // let p1 = {x: 165, y: 142};
        // let tween1 = new TWEEN.Tween(p1).to({x: 226, y: 142}, 3333);
        // let tween2 = new TWEEN.Tween(p1).to({x: 226, y: 63}, 3333);
        // tween1.chain(tween2).start();
        // tween2.onComplete(() => {
        //     console.log("==");
        //     p1.x = 165;
        //     p1.y = 142;
        //     tween1.start();
        // });
    }
}
