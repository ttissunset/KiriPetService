// DataTypes 是每个字段的数据类型
const { DataTypes } = require("sequelize");
// 导入seq实例
const seq = require("../db/seq");

const User = seq.define("user", {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "用户名",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "密码",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    comment: "邮箱",
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否为管理员，0不是管理员，1是管理员",
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "头像",
    defaultValue: "https://kiripet.tos-cn-beijing.volces.com/image/avatar.jpg",
  },
  birth: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "生日",
    defaultValue: "未设置",
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "用户简介",
    defaultValue: "这个人很懒，什么都没有~~~",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "地区",
    defaultValue: "未知",
  },
});

User.sync({ force: true })

module.exports = User;
