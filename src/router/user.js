const Router = require('koa-router')

const {
  userValidate,
  verificationCode,
  verifyUser,
  cryptPassword,
  verifyCode,
} = require('../middleware/user.middleware')

const { register } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

// 发送验证码
router.post('/send_verification_code', verificationCode)
// 注册接口
router.post('/register', userValidate, verifyUser,verifyCode, cryptPassword, register)

module.exports = router