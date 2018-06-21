import flagwind from "flagwind-core";
import injectable = flagwind.injectable;
import Stomp, {Client, Frame, Message} from "stompjs";
import SockJS from "sockjs-client";
import {baseUrl} from "src/settings";

@injectable()
export default class StompClientFactory {

    /**
     * stompClient单例
     */
    private static _instance: Promise<Client>;

    public static getInstance(caller: string = "log") {
        if (StompClientFactory._instance == null) {
            console.log("new stompClient单例");
            let socket = new SockJS(baseUrl + "/stomp-websocket");
            let client = Stomp.over(socket);

            StompClientFactory._instance = new Promise<Client>(((resolve1, reject1) => {
                client.connect("", "", (frame: Frame) => {
                    console.log("stomp连接成功");
                    resolve1(client);

                }, (error: string) => {
                    console.log("stomp连接出错");
                    reject1(error);
                });
            }));
        }
        return (StompClientFactory._instance);
    }

    public static async subscribe(destination: string, callback) {
        try {
            let client: Client = await StompClientFactory.getInstance("subscribe");
            console.log("订阅成功: " + destination);
            let subscription = client.subscribe(destination, (msg: Frame) => {
                let body = null;
                try {
                    body = JSON.parse(msg.body);
                } catch (e) {
                    console.log("解析stomp消息失败");
                    console.log(e);
                    return;
                }
                callback(body);
            }, {});
            return Promise.resolve(subscription);
        } catch (e) {
            console.log("订阅失败: " + destination);
            console.log(e);
        }
    }
}
