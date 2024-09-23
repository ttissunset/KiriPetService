const Info = require("../model/info.model");

class InfoService {
  // 添加宠物百科信息
  async createInfos(infos) {
    const res = await Info.create(infos);
    return res.dataValues;
  }

  async getPetInfo({ id, petName }) {
    // 定义where查询条件
    const whereOpt = {};

    // 判断是否传有对应的参数，如果有则即将该参数拷贝到 whereOpt 中
    id && Object.assign(whereOpt, { id });
    petName && Object.assign(whereOpt, { petName });

    // 通过 User.findOne() 获取查询到的第一条数据
    const res = await User.findOne({
      // 通过 attributes 数组中的特定属性值对数据表进行 select 查询
      attributes: ["id", "petName"],
      // where 查询条件
      where: whereOpt,
    });

    // 判断是否有返回结果
    return res ? res.dataValues : null;
  }

  // 更新宠物百科信息
  async upadetaInfos(id, infos) {
    // 通过 id 查询对应的宠物信息，并通过 ginfos 替代原有数据
    const res = await Info.update(goods, { where: { id } });
    // 如果有更新成功，则至少返回一条数据
    return res[0] > 0 ? true : false;
  }

  // 删除数据
  async removeInfos(id) {
    // 通过id删除数据表中宠物百科信息
    const res = await Info.destroy({ where: { id } });
    return res > 0 ? true : false;
  }

  //查询宠物百科中的信息
  async findInfos(pageNum, pageSize) {
    // 获取总数和获取分页数据
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Goods.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
    });

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
}

module.exports = new InfoService();
