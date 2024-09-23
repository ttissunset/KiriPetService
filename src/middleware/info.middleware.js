const { getPetInfo } = require("../service/info.service");

const {
  petFormatError,
  petInfoAlreadyExisted,
  getPetInfoError,
} = require("../constant/error.type");

const infoValidate = async (ctx, next) => {
  try {
    // koa-parameter 中间件提供的方法，用于对数据格式的校验
    ctx.verifyParams({
      id: { type: "string", required: true },
      petName: { type: "number", required: true },
      imageUrl: { type: "number", required: true },
      miniDes: { type: "string", required: true },
    });
  } catch (err) {
    console.error(err);
    petFormatError.result = err.message;
    return ctx.app.emit("error", petFormatError, ctx);
  }
  await next();
};

const verifyPetInfo = async (ctx, next) => {
  const { id } = ctx.request.body;
  try {
    // 在数据库中查询用户是否存在
    const res = await getPetInfo({ id });
    if (res) {
      console.error("该宠物信息已存在", { id });
      ctx.app.emit("error", petInfoAlreadyExisted, ctx);
      return;
    }
  } catch (err) {
    console.error("获取宠物信息失败", err);
    ctx.app.emit("error", getPetInfoError, ctx);
    return;
  }
  await next();
};

module.exports = {
  infoValidate,
  verifyPetInfo,
};
