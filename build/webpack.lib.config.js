const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function resolve(dir)
{
    return path.join(__dirname, "..", dir);
}

module.exports =
{
    entry:
    {
        vue:
        [
            "vue",
            "vue-router",
            "vuex"
        ],
        flagwind:
        [
            "flagwind-core",
            "flagwind-web"
        ],
        vendor:
        [
            "./src/vendor.js"
        ]
    },
    output:
    {
        // 将打包后的 js 放到 static/lib 目录下，build 的时候会 copy 到 dist 目录
        path: resolve("static/lib"),

        filename: "[name].js",
        
        library: "[name]_library"
    },
    resolve:
    {
        alias: 
        {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    plugins:
    [
        new webpack.DllPlugin
        ({
            /*
             * 这里的 context 非常关键
             * 这个上下文必须必须同 webpack.base.config.js 中 DllReferencePlugin 插件的 context 所指向的上下文保持一致！
             */
            context: path.join(__dirname, ".."),
            
            /**
             * 定义 manifest 文件生成的位置
             * [name]的部分由 entry 的名字替换
             */
            path: resolve("config/[name].manifest.json"),
            
            /**
             * dll bundle 输出的全局变量名
             * 和 output.library 一样即可。 
             */
            name: "[name]_library"
        }),
        new UglifyJsPlugin
        ({
            uglifyOptions:
            {
                compress:
                {
                    warnings: false,
                    drop_console: true
                }
            },
            sourceMap: false,
            parallel: true
        })
    ]
}
