const path = require("path");
const Koa = require("koa");

const cors = require("koa2-cors");

const errHandler = require("./error.handle");

// 解析路由参数的中间件
const { koaBody } = require("koa-body");
const koaStaic = require("koa-static");
const parameter = require("koa-parameter");
const bodyParser = require("koa-bodyparser");

// 创建koa实例
const app = new Koa();

// 从环境变量中获取端口
const { APP_PORT } = require("../src/config/congfig");

const router = require("../src/router/index");

// 使用koda-body中间件对body参数进行处理
app.use(
  koaBody({
    // multipart:是否开启文件上传 --> 默认为false
    multipart: true,
    formidable: {
      // 文件要保存的路径
      //! 在配置选项option中，应该避免使用相对路径 --> 因为在option中，相对的是 process.cwd() 而非当前文件
      uploadDir: path.join(__dirname, "../upload"),
      // 保留文件后缀名
      keepExtensions: true,
    },
    // 配置koa-body中间件，使以下方法的body参数可以挂载到ctx.request.body下
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE"],
  })
);
// 使用 koa-static 中间件将upload文件夹配置为静态资源
app.use(koaStaic(path.join(__dirname, "../upload")));
app.use(parameter(app));
app.use(bodyParser());

// 配置 CORS 中间件
app.use(
  cors({
    origin: "http://localhost:5173", // 仅允许来自 http://localhost:5173 的请求
    credentials: true, // 是否允许发送 Cookie
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 设置所允许的 HTTP 请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"], // 设置服务器支持的所有头信息字段
  })
);

// 将路由添加到Koa应用
app.use(router.routes()).use(router.allowedMethods());

// 统一的错误处理
app.on("error", errHandler);

// 全局变量
global.sharedData = {
  verificationCode: null,
};

app.listen(APP_PORT, (ctx) => {
  ctx.body = "Welcome!";
  console.log(`Server is running on port ${APP_PORT}`);
});
