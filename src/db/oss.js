const OSS = require("ali-oss");
const logger = require("../config/logger");

// 创建 OSS 客户端实例
const ossClient = new OSS({
  region: "oss-cn-guangzhou",
  accessKeyId: "LTAI5tJxBXj1AmoFvwpL47Ao",
  accessKeySecret: "ceN4eE3xCV33zPcU2kYSq4OpoMBzi2",
  bucket: "k-chat-test",
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
