// DataTypes 是每个字段的数据类型
const { DataTypes } = require("sequelize");
// 导入seq实例
const seq = require("../db/seq");

const UserInfo = seq.define("userInfo", {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "昵称",
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "头像",
  },
  birth: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "生日",
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "性别",
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "用户简介",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "地区",
  },
});

// UserInfo.sync({ force: true })

module.exports = UserInfo;
