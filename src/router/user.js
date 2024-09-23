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

module.exports = router;
