const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const { getUserinfo } = require("../service/user.service");

const {
  userFormatError,
  UserCodeError,
  userRegisterError,
  userAlreadyExisted,
  emailRegaxError,
  userDoesNotExist,
  invalidPassword,
  userLoginError
} = require("../constant/error.type");

// 数据校验 --> 判断密码或用户名是否为空
const registerValidate = async (ctx, next) => {
  // 从body中解构处需要用到的数据
  const { user_name, password, email } = ctx.request.body;
  // 邮箱校验正则规则
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // console.log(user_name, password, email);
  if (!user_name || !password || !email) {
    console.error("用户名/密码/邮箱 不能为空！！", ctx.request.body);
    // 通过emit提交错误信息
    ctx.app.emit("error", userFormatError, ctx);
    return;
  }
  if (!emailRegex.test(email)) {
    console.error("请输入正确的邮箱格式！", ctx.request.body);
    ctx.app.emit("erroe", emailRegaxError, ctx);
    return;
  }
  await next();
};

const loginValidate = async (ctx, next) => {
  // 从body中解构处需要用到的数据
  const { user_name, password } = ctx.request.body
  if (!user_name || !password) {
    console.error('用户名或密码为空！！', ctx.request.body)
    ctx.app.emit('error', userFormatError, ctx)
    return
  }
  await next()
}

// 检测数据合理性 --> 判断数据库中是否有该用户
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  try {
    // 在数据库中查询用户是否存在
    const res = await getUserinfo({ user_name });
    if (res) {
      console.error("用户名已存在", { user_name });
      ctx.app.emit("error", userAlreadyExisted, ctx);
      return;
    }
  } catch (err) {
    console.error("获取用户信息失败", err);
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};

// 判断验证码是否正确
const verifyCode = async (ctx, next) => {
  // 获取用户输入的验证码
  const { code } = ctx.request.body;
  // 判断验证码是否正确
  if (code !== global.sharedData.verificationCode) {
    ctx.app.emit("error", UserCodeError, ctx);
    return;
  }
  await next();
};

// 对密码进行加密
const cryptPassword = async (ctx, next) => {
  // 从body中获取密码
  const { password } = ctx.request.body;
  // 对密码进行十次加盐处理
  const salt = await bcrypt.genSalt(10);
  // hashPassword为加密后的密码
  const hashPassword = await bcrypt.hash(password, salt);
  // 用加密后的密码覆盖原来的密码
  ctx.request.body.password = hashPassword;
  await next();
};

// 发送验证码
const verificationCode = async (ctx, next) => {
  const { email } = ctx.request.body;
  // 配置Nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465, // QQ 邮箱使用的是 SSL，端口 465
    secure: true, // 使用 SSL
    auth: {
      user: "2733908676@qq.com", // 你的邮箱地址
      pass: "adzgozeoszfoddbe", // 你的邮箱密码或授权码
    },
  });

  // 生成验证码逻辑可以在这里添加
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  // 配置邮件内容
  const mailOptions = {
    // 发件人的邮件地址
    from: '"KiriPet" <2733908676@qq.com>',
    // 收件人邮件地址
    to: email,
    // 邮件主题
    subject: "KiriPet-验证邮件:",
    html: `<div style="width: 400px; height:450px; padding: 20px 30px; margin: 0 auto;">
  <div>
    <div style="width: 100%; margin-bottom: 50px;margin-top:30px">
      <span
        style="
          font-family: 'Nunito', Arial, Tahoma, Geneva, sans-serif;
          line-height: 55px;
          color: #6777ef;
          font-size: 48px;
          font-weight: 700;
        "
        >KiriPet</span
      >
    </div>
    <div>
      <div
        style="
          font-family: 'Nunito', Arial, Tahoma, Geneva, sans-serif;
          color: #1a1a1a;
          font-size: 52px;
          font-weight: 300;
        "
      >
        Hi,Friend
      </div>
      <div
        style="
          font-family: 'Nunito', Arial, Tahoma, Geneva, sans-serif;
          color: #585858;
          font-size: 24px;
          line-height: 32px;
          margin-bottom: 20px;
        "
      >
        以下是你的6位数字邮箱验证码:
      </div>
      <div
        style="background-color: #6777ef; font-size: 20px;font-weight: 600;line-height: 30px; width: fit-content;padding:10px 10px;color: white;"
      >
        ${verificationCode.toString()}
      </div>
    </div>
  </div>
  <div style="margin:30px 0 10px 0">
    <small style="display: block; margin-bottom:10px"
      ><p style="color: #747474; font-size: 16px;line-height: 32px">
        注意:泄露验证码可能导致您的账户处于危险状态。如果您从未请求发送邮箱验证码，请忽略此邮件<br /></p
    ></small>
  </div>
</div>
`,
  };
  // 发送邮件
  try {
    await transporter.sendMail(mailOptions);
    // 将本次验证码挂载
    global.sharedData.verificationCode = verificationCode.toString();
    console.log(global.sharedData.verificationCode);
    ctx.body = { success: true, message: "验证码已发送" };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "验证码发送失败" };
  }
};

// 检测登录用户名和密码是是否正确
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 1.判断用户是否存在
  try {
    const res = await getUserinfo({ user_name });
    // 如果查询不到该用户信息，抛出错误
    if (!res) {
      console.error("用户名不存在", userDoesNotExist);
      ctx.app.emit("error", userDoesNotExist, ctx);
      return;
    }

    // 2.判断密码是否匹配
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
  } catch (error) {
    console.error("获取用户信息失败", error);
    return ctx.app.emit("error", userLoginError, ctx);
  }

  await next();
};

module.exports = {
  registerValidate,
  loginValidate,
  verificationCode,
  verifyUser,
  cryptPassword,
  verifyCode,
  verifyLogin,
};
