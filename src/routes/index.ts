import {resolve} from "path";

export const routes =
    [
        {
            name: "monitoring",
            path: "/",
            component: (resolve: any) => (<any>require)(["src/views/monitoring2/index.ts"], resolve)
        },
        {
            name: "500",
            path: "/500",
            component: (resolve: any) => (<any>require)(["src/views/errors/500.ts"], resolve)
        },
        {
            name: "403",
            path: "/403",
            component: (resolve: any) => (<any>require)(["src/views/errors/403.ts"], resolve)
        },
        {
            name: "404",
            path: "/*",
            component: (resolve: any) => (<any>require)(["src/views/errors/404.ts"], resolve)
        }
    ];
