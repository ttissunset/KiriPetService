const jwt = require("jsonwebtoken");
const path = require("path");
const { userRegisterError } = require("../constant/error.type");
const { createUser, getUserinfo } = require("../service/user.service");
const { JWT_SECRET } = require("../config/config");
const logger = require("../config/logger");

const {
  fileUploadError,
  unSupportedFileType,
} = require("../constant/error.type");

class UserController {
  // 注册接口
  async register(ctx, next) {
    // 获取用户信息
    const { user_name, password, email } = ctx.request.body;

    try {
      // 操作数据库
      const res = createUser(user_name, password, email);

      logger.info("注册用户成功:" + user_name);

      // 向客户端返回结果
      ctx.body = {
        code: 0,
        message: "注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      logger.error("注册失败:", err);
      userRegisterError.result = err.message;
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }

  // 登录接口
  async login(ctx, next) {
    try {
      const { user_name } = ctx.request.body;
      // 从数据库中解构出数据，并剔除password
      const { password, ...res } = await getUserinfo({ user_name });

      logger.info("登陆成功:" + user_name);

      // 向客户端返回内容
      ctx.body = {
        code: 0,
        msg: "用户登录成功",
        result: {
          user_name: user_name,
          // 携带token jwt.sign(payload,secret,{ expiresIn: time }) --> payload 是要携带的参数对象，secret:是加密私钥，expiresIn是有效时间
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "10d" }),
        },
      };
    } catch (err) {
      logger.error("登录失败：" + err);

      console.error("用户登录失败", err);
    }
  }
}

module.exports = new UserController();
