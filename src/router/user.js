const Router = require("koa-router");

const {
  verificationCode,
  verifyUser,
  cryptPassword,
  verifyCode,
  verifyLogin,
  registerValidate,
  loginValidate,
} = require("../middleware/user.middleware");

const { register, login } = require("../controller/user.controller");

const { redirect, oauth } = require("../middleware/oauth.middleware");

const router = new Router({ prefix: "/users" });

// 发送验证码
router.post("/send_verification_code", verificationCode);

// 注册接口
router.post(
  "/register",
  registerValidate,
  verifyUser,
  verifyCode,
  cryptPassword,
  register
);

// 登录接口
router.post("/login", loginValidate, verifyLogin, login);

//! github Oauth认证--暂未完全实现
router.get("/github/callback", redirect, oauth);

module.exports = router;
