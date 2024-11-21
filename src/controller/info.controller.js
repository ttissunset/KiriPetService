const Path = require("path");
const {
  createInfos,
  upadetaInfos,
  removeInfos,
  findInfos,
} = require("../service/info.service");

const {
  fileUploadError,
  unSupportedFileType,
  createInfoError,
  invalidInfoId,
} = require("../constant/error.type");
const logger = require("../config/logger");

class InfosController {
  // 上传图片的处理函数
  async upload(ctx, next) {
    // 从  ctx.request.files 中解构出 名称为 file 的文件
    const { file } = ctx.request.files;
    console.log(file);
    // 指定文件上传类型为jpg/png
    const fileTypes = ["image/jpeg", "image/png"];
    // 判断是否有名称为 file 的文件
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        // 如果文件类型不属于我们指定的文件类型，则抛出错误
        return ctx.app.emit("error", unSupportedFileType, ctx);
      }
      ctx.body = {
        code: 0,
        message: "文件上传成功！！",
        result: {
          goods_img: Path.basename(file.filepath),
        },
      };
      logger.info("宠物图片上传成功")
    } else {
      // 如果没有则抛出错误
      return ctx.app.emit("error", fileUploadError, ctx);
    }
  }

  // 发布信息的处理函数
  async create(ctx) {
    // 直接调用service的createInfos方法
    try {
      const res = await createInfos(ctx.request.body);

      logger.info("发布宠物信息成功");

      ctx.body = {
        code: 0,
        message: "发布成功！！",
        result: res,
      };
    } catch (err) {
      logger.error("发布宠物信息失败：" + err);

      console.error(err);
      return ctx.app.emit("err", createInfoError, ctx);
    }
  }

  // 更新信息的处理函数
  async update(ctx) {
    try {
      const res = await upadetaInfos(ctx.params.id, ctx.request.body);
      if (res) {
        logger.info("更新宠物信息成功:" + ctx.params.id);
        ctx.body = {
          code: 0,
          message: "修改宠物信息成功！！",
          result: "",
        };
      } else {
        return ctx.app.emit("error", invalidInfoId, ctx);
      }
    } catch (err) {
      logger.error("修改宠物信息失败：" + err);
      console.error(err);
    }
  }

  // 删除信息的处理函数
  async remove(ctx) {
    await removeInfos(ctx.params.id);
    logger.info("删除宠物信息成功" + ctx.params.id);
    ctx.body = {
      code: 0,
      message: "删除成功！！",
      result: "",
    };
  }

  // 获取所有商品的处理函数
  async findAll(ctx) {
    // 1.解析pageNum和pageSize参数
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    // 2.调佣数据处理的方法
    const res = await findInfos(pageNum, pageSize);
    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "获取商品列表成功！！",
      result: {
        res,
      },
    };
  }
}

module.exports = new InfosController();
