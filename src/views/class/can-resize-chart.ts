import {Component} from "flagwind-web";
import ECharts from "components/echarts/echarts";

export default class CanResizeChart extends Component {
    public onResize(ref: string = "chart") {
        let w: number;
        let h: number;

        let chart = this.$refs[ref] as ECharts;
        if (chart) {
            w = chart.$el.clientWidth;
            h = chart.$el.clientHeight;
            chart.resize(w, h);
        }
    }

    protected mounted() {
        this.onResize();
        (<any>window).addEventListener("resize", () => {
            this.onResize();
        });
    }
}
