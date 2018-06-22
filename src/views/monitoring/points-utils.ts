import Point from "views/monitoring/point";
import {Path} from "views/monitoring/i-path";

export function createRunningPointsAlongPath(count: number, path: Path) {
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
