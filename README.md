KiriPet 后台服务

## 项目地址

http://api.kirii.site（域名暂时撤下）
http://101.126.150.33:3000/

## 项目部署

在宝塔终端面板通过`ssh-keygen`生成密钥

再通过`cat ~/.ssh/id_rsa.pub`将秘钥复制到对应项目的 Deploy keys 中

## 启动项目

在 `package.json` 中修改

```shell
"scripts": {
    "dev": "nodemon ./src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1",}
```

```shell
npm run dev
```

## 项目结构
- src/app :  http服务模块，存放与服务搭建的框架的有关内容
- src/config : 配置文件模块，读取.env配置文件并写入process.env环境变量
- src/constant : 常量模块，定义需要多次使用的常量
- src/controller : 路由管理模块，对路由请求进行处理
- src/db : 数据库模块，进行数据库的链接
- src/middleware : 中间件模块，抽离中间件降低耦合提高复用
- src/model : 模型模块，定义模型映射数据表 
- src/router : 路由模块，存放不同的路由
- src/service : 数据库操作模块，完成对数据库的操作
- index.js : 项目入口文件
- .env : 配置文件，定义环境变量

## 配置环境变量

`.env`文件中保存的是系统变量

```txt
APP_PORT = 3000
NODE_ENV = development

MYSQL_HOST = 127.0.0.1
MYSQL_PORT = 3306
MYSQL_USER = root
MYSQL_PWD = 你的数据库密码
MYSQL_DB = 你的数据库名称

JWT_SECRET = coisini
```

- `NODE_ENV` 配置为开发环境
- `APP_PORT` 配置为服务端口
- `JWT_SECRET` 配置为加密秘钥
- `MYSQL-xxx` 配置为数据库相关配置
