KiriPet 后台服务

## 项目地址

http://api.kirii.site

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
