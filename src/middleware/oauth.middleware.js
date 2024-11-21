const jwt = require("jsonwebtoken");

const GITHUB_CLIENT_ID = "Ov23liux0akjmdkQezp9";
const GITHUB_CLIENT_SECRET = "249db958cd48b6d5e9f0b5de640db6bf2e6649da";
const { JWT_SECRET } = require("../config/config");

const redirect = (ctx) => {
  const redirect_uri = "http://localhost:3000/users/github/callback";
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}`;
  ctx.redirect(githubAuthUrl);
};

const oauth = async (ctx) => {
  const { code } = ctx.query;

  const tokenResponse = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    },
    { headers: { accept: "application/json" } }
  );

  const accessToken = tokenResponse.data.access_token;

  // 从 github 获取信息
  const userResponse = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const user = userResponse.data;

  // 生成token
  const token = jwt.sign({ id: user.id, username: user.login }, JWT_SECRET, {
    expiresIn: "1d",
  });

  // 返回token给前端
  ctx.body = {
    code: 0,
    msg: "ouath登录成功",
    result: {
      token: token,
    },
  };

  //   重定向回前台首页
  ctx.redirect("http://localhost:5173/home");
};

module.exports = {
  redirect,
  oauth,
};
