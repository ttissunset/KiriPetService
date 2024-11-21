const { Sequelize } = require("sequelize");
const logger = require("../config/logger.js");

// 导入配置文件
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require("../config/config.js");

// 创建 Sequelize 实例，直接指定数据库名称
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  portL: MYSQL_PORT,
  dialect: "mysql",
  logging: (msg) => logger.debug(msg),
});

// 初始化数据库
// const initChatDatabase = async () => {
//   try {
//     // 先创建一个不指定数据库的连接
//     const tempSequelize = new Sequelize(
//       "mysql://root:qqr25741@101.126.150.33:3306"
//     );

//     // 创建数据库（如果不存在）
//     await tempSequelize.query("CREATE DATABASE IF NOT EXISTS chat;");

//     // 关闭临时连接
//     await tempSequelize.close();

//     // 测试主连接
//     await seq.authenticate();
//     logger.info("数据库连接成功");

//     return true;
//   } catch (error) {
//     logger.error("数据库初始化失败:", error);
//     throw error;
//   }
// };

// 测试mysql是否链接成功
// seq
//   .authenticate()
//   .then(() => {
//     console.log('数据库连接成功')
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err)
//   })

module.exports = seq;
