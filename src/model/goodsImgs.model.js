const { DataTypes } = require("sequelize");
const seq = require("../db/seq.js");

const GoodsImg = seq.define(
  "goodsImgs",
  {
    goods_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
      comment: "唯一id",
    },
    goods_img1: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片1",
    },
    goods_img2: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片2",
    },
    goods_img3: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片3",
    },
    goods_img4: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片4",
    },
    goods_img5: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片5",
    },
  },
  {
    paranoid: true,
  }
);

// 通过 Goods.sync({ force: true }) 强制创建goods表
// Goods.sync({ force: true })

module.exports = GoodsImg;
