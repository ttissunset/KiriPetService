const { getPetInfo } = require("../service/info.service");

const {
  petFormatError,
  petInfoAlreadyExisted,
  getPetInfoError,
} = require("../constant/error.type");

const infoValidate = async (ctx, next) => {
  // 从body中解构处需要用到的数据
  const { id, petName, imageUrl } = ctx.request.body;
  if (!id || !petName || !imageUrl) {
    console.error("宠物id/宠物名/宠物图片为空", ctx.request.body);
    ctx.app.emit("error", petFormatError, ctx);
    return;
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
