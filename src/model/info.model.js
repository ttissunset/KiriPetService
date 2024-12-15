// DataTypes 是每个字段的数据类型
const { DataTypes } = require("sequelize");
// 导入seq实例
const seq = require("../db/seq");

const Info = seq.define("infos", {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "图片地址",
  },
  petName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "宠物名字",
  },
  miniDes: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "宠物简概",
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "宠物详情",
  },
});

// Info.sync({ force: true });

module.exports = Info;
