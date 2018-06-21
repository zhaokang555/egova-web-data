import { component, View } from "flagwind-web";
import "./404.less";
/**
 * 错误 404 视图。
 * @class
 * @version 1.0.0
 */
@component({
    template: require("./404.html")
})
export default class Error404View extends View {
    /**
     * 当返回首页按钮点击时调用。
     * @protected
     * @param  {MouseEvent} e 鼠标事件参数。
     * @returns void
     */
    protected onBackHomeClick(e: MouseEvent): void {
        this.$router.push("/");
    }

    /**
     * 当返回上一页按钮点击时调用。
     * @protected
     * @param  {MouseEvent} e 鼠标事件参数。
     * @returns void
     */
    protected onBackPrevClick(e: MouseEvent): void {
        this.$router.go(-1);
    }
}
