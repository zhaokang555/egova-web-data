# egova-web-data

## 项目结构
```
┌── build                   # webpack脚本
├── config                  # config
├── src                     # main
│    ├── application 		# 程序启动载入处理逻辑
│    ├── assets     		# 可打包资源文件
│    ├── common             # common
│    │    ├── map      	    # 地图相关代码
│    │    ├── mixins      	# vue多页面共用mixins
│    │    └── utils   		# 页面相关样式，页面内单独引用
│    ├── components 		# 项目中共用components
│    ├── models 		    # 项目中模型实体定义
│    ├── routes 		    # vue-router前端路由
│    ├── services 		    # 项目中共用服务定义
│    ├── store              # store
│    │    └── modules      	# 按模块使用
│    ├── styles             # 全局性样式定义
│    ├── typings            # d文件定义
│    ├── views              # 业务模块视图定义
│    ├── settings      		# 全局设置
│    ├── index.ts           # 入口
│    └── vendor.js          # vendor
│
├── node_modules            # 依赖
├── static                  # 静态文件
├── dist                    # 打包之后的文件
├── .babelrc                # babel config
├── .editorconfig	        # 通用编辑器配置
├── .gitignore		        # git忽略提交配置
├── .eslintignore           # eslint忽略配置文件
├── .eslintrc.js            # eslint配置
├── .postcssrc.js           # postcss配置
├── index.html              # index入口文件
└── package.json            # package info
```

## 注意事项

因为采用了 dll 预打包，所以首次（或核心库版本发生变动），需要执行:

``` bash
$ npm run build:lib
```

> 默认核心库包含如下内容:

- vue
    - vue
    - vue-router
- flagwind
    - flagwind-core
    - flagwind-web

> 自定义核心库在 `vendor.js` 中配置

如果项目依赖如 `axios`，`lodash` 等库，只需按照如下方式导入即可:

``` js
import axios from "axios";
import lodash from "lodash";
```

## 常用命令

- `npm run dev` 进入调试模式，默认地址为 `http://localhost:8040`
- `npm run lint` 使用 `tslint` 验证源码
- `npm run build:lib` 预打包核心依赖库
- `npm run build` 生产打包

## 更新说明

### 2018-04-10更新
> 解决生产环境下url相对路径问题

> 添加了项目对可替换图片的处理机制
```
我们约定assets/customize下的图片资源会，转存至static/images/customize 下。所以项目图片资源组织规范应如下：
```
- 所有图片资源都应该放在assets目录下，文件引用如：~assets/image/bg.png
- 对于需求根据项目不同而替换的图片资源，应该放在assets/customize 下
- customize 下不应该有子目录
