const OSS = require("ali-oss");
const logger = require("../config/logger");
const { ACCESSKEY_ID, ACCESSKEY_SECRET, BUCKET } = require("../config/config");

// 创建 OSS 客户端实例
const ossClient = new OSS({
  region: "oss-cn-guangzhou",
  accessKeyId: ACCESSKEY_ID,
  accessKeySecret: ACCESSKEY_SECRET,
  bucket: BUCKET,
  timeout: 120000,
  retries: 3,
  authorizationV4: true,
  partSize: 1024 * 1024,
  enableUploadProgress: true,
  enableProxy: true,
});

// 测试 OSS 连接
const testOssConnection = async () => {
  try {
    await ossClient.getBucketInfo();
    logger.info("OSS 连接成功");
    return true;
  } catch (error) {
    logger.error("OSS 连接失败:", error);
    return false;
  }
};

module.exports = {
  ossClient,
  testOssConnection,
};
